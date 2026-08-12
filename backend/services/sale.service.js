import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";

const generateInvoiceNumber = async (connection) => {
  const [rows] = await connection.query(
    `SELECT COUNT(*) AS total FROM sales`
  );

  const next = rows[0].total + 1;

  return `INV-${new Date().getFullYear()}-${String(next).padStart(6, "0")}`;
};

/**
 * Create Sale
 */
export const createSale = async (saleData, userId) => {

  const connection = await pool.getConnection();

  try {

    await connection.beginTransaction();

    const {
      customer_id,
      sale_date,
      payment_method,
      discount = 0,
      tax = 0,
      items,
    } = saleData;

    if (!customer_id) {
      throw new ApiError(400, "Customer is required");
    }

    if (!items || items.length === 0) {
      throw new ApiError(400, "At least one sale item is required");
    }

    // Validate Customer
    const [customer] = await connection.query(
      `SELECT id
       FROM customers
       WHERE id = ?
       AND status = 'Active'`,
      [customer_id]
    );

    if (customer.length === 0) {
      throw new ApiError(404, "Customer not found");
    }

    const invoiceNo = await generateInvoiceNumber(connection);

    const [sale] = await connection.query(
      `INSERT INTO sales
      (
        customer_id,
        invoice_no,
        sale_date,
        payment_method,
        discount,
        tax,
        total_amount
      )
      VALUES (?, ?, ?, ?, ?, ?, 0)`,
      [
        customer_id,
        invoiceNo,
        sale_date,
        payment_method,
        discount,
        tax,
      ]
    );

    const saleId = sale.insertId;

    let total = 0;

    // Process Sale Items
    for (const item of items) {

      const {
        product_id,
        quantity,
      } = item;

      // Validate Product
      const [product] = await connection.query(
        `SELECT
            id,
            selling_price,
            quantity,
            status
         FROM products
         WHERE id = ?`,
        [product_id]
      );

      if (product.length === 0 || product[0].status !== "Active") {
        throw new ApiError(
          404,
          `Product ${product_id} not found`
        );
      }

      if (product[0].quantity < quantity) {
        throw new ApiError(
          400,
          `Insufficient stock for product ${product_id}`
        );
      }

      const sellingPrice = product[0].selling_price;
      const subtotal = sellingPrice * quantity;

      total += subtotal;

      // Insert Sale Item
      await connection.query(
        `INSERT INTO sale_items
        (
          sale_id,
          product_id,
          quantity,
          selling_price,
          subtotal
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
          saleId,
          product_id,
          quantity,
          sellingPrice,
          subtotal,
        ]
      );

      // Reduce Stock
      await connection.query(
        `UPDATE products
         SET quantity = quantity - ?
         WHERE id = ?`,
        [
          quantity,
          product_id,
        ]
      );

    }

    const grandTotal =
      total - Number(discount) + Number(tax);

    await connection.query(
      `UPDATE sales
       SET total_amount = ?
       WHERE id = ?`,
      [
        grandTotal,
        saleId,
      ]
    );

    await connection.commit();

    return {
      sale_id: saleId,
      invoice_no: invoiceNo,
      total_amount: grandTotal,
    };

  } catch (error) {

    await connection.rollback();
    throw error;

  } finally {

    connection.release();

  }

};

/**
 * Get All Sales
 */
export const getAllSales = async () => {

  const [sales] = await pool.query(
    `SELECT
        s.id,
        s.invoice_no,
        c.name AS customer_name,
        s.sale_date,
        s.payment_method,
        s.discount,
        s.tax,
        s.total_amount
     FROM sales s
     INNER JOIN customers c
       ON s.customer_id = c.id
     ORDER BY s.id DESC`
  );

  return sales;

};

/**
 * Get Sale By ID
 */
export const getSaleById = async (saleId) => {

  // Sale Header
  const [sale] = await pool.query(
    `SELECT
        s.*,
        c.name AS customer_name,
        c.phone,
        c.email,
        c.address
     FROM sales s
     INNER JOIN customers c
       ON s.customer_id = c.id
     WHERE s.id = ?`,
    [saleId]
  );

  if (sale.length === 0) {
    throw new ApiError(404, "Sale not found");
  }

  // Sale Items
  const [items] = await pool.query(
    `SELECT
        si.id,
        si.product_id,
        p.product_name,
        si.quantity,
        si.selling_price,
        si.subtotal
     FROM sale_items si
     INNER JOIN products p
       ON si.product_id = p.id
     WHERE si.sale_id = ?`,
    [saleId]
  );

  sale[0].items = items;

  return sale[0];

};

/**
 * Cancel Sale
 */
export const cancelSale = async (saleId) => {

  const connection = await pool.getConnection();

  try {

    await connection.beginTransaction();

    const [sale] = await connection.query(
      `SELECT id, status
       FROM sales
       WHERE id = ?`,
      [saleId]
    );

    if (sale.length === 0) {
      throw new ApiError(404, "Sale not found");
    }

    if (sale[0].status === "Cancelled") {
      throw new ApiError(400, "Sale already cancelled");
    }

    // Get sale items
    const [items] = await connection.query(
      `SELECT
          product_id,
          quantity
       FROM sale_items
       WHERE sale_id = ?`,
      [saleId]
    );

    // Restore stock
    for (const item of items) {

      await connection.query(
        `UPDATE products
         SET quantity = quantity + ?
         WHERE id = ?`,
        [
          item.quantity,
          item.product_id,
        ]
      );

    }

    // Update status
    await connection.query(
      `UPDATE sales
       SET status = 'Cancelled'
       WHERE id = ?`,
      [saleId]
    );

    await connection.commit();

    return {
      sale_id: Number(saleId),
      status: "Cancelled",
    };

  } catch (error) {

    await connection.rollback();
    throw error;

  } finally {

    connection.release();

  }

};
