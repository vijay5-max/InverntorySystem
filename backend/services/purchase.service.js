import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import { generatePurchaseNumber } from "../utils/generatePurchaseNumber.js";

/**
 * Create Purchase
 */
export const createPurchase = async (purchaseData, userId) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const {
      supplier_id,
      purchase_date,
      remarks,
      items,
    } = purchaseData;

    // Validate Supplier
    if (!supplier_id) {
      throw new ApiError(400, "Supplier is required");
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new ApiError(400, "At least one purchase item is required");
    }

    const [supplier] = await connection.query(
      `SELECT id
       FROM suppliers
       WHERE id = ?
       AND status = 'Active'`,
      [supplier_id]
    );

    if (supplier.length === 0) {
      throw new ApiError(404, "Supplier not found or inactive");
    }

    // Generate Purchase Number
    const purchaseNo = await generatePurchaseNumber(connection);

    // Insert Purchase Header
    const [purchase] = await connection.query(
      `INSERT INTO purchases
      (
        purchase_no,
        supplier_id,
        purchase_date,
        remarks,
        created_by
      )
      VALUES (?, ?, ?, ?, ?)`,
      [
        purchaseNo,
        supplier_id,
        purchase_date,
        remarks,
        userId,
      ]
    );

    const purchaseId = purchase.insertId;
    let totalAmount = 0;

    // Process Purchase Items
    for (const item of items) {

      const {
        product_id,
        quantity,
        purchase_price,
      } = item;

      if (!product_id) {
        throw new ApiError(400, "Product is required");
      }

      if (quantity <= 0) {
        throw new ApiError(400, "Quantity must be greater than zero");
      }

      if (purchase_price <= 0) {
        throw new ApiError(400, "Purchase price must be greater than zero");
      }

      const [products] = await connection.query(
        `SELECT id, quantity
         FROM products
         WHERE id = ?
         AND status = 'Active'`,
        [product_id]
      );

      if (products.length === 0) {
        throw new ApiError(
          404,
          `Product ${product_id} not found`
        );
      }

      const subtotal = quantity * purchase_price;

      totalAmount += subtotal;

      // Insert Purchase Item
      await connection.query(
        `INSERT INTO purchase_items
        (
          purchase_id,
          product_id,
          quantity,
          purchase_price,
          subtotal
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
          purchaseId,
          product_id,
          quantity,
          purchase_price,
          subtotal,
        ]
      );

      // Update Product Stock
      await connection.query(
        `UPDATE products
         SET quantity = quantity + ?
         WHERE id = ?`,
        [
          quantity,
          product_id,
        ]
      );
    }

    // Update Total
    await connection.query(
      `UPDATE purchases
       SET total = ?
       WHERE id = ?`,
      [
        totalAmount,
        purchaseId,
      ]
    );

    await connection.commit();

    return {
      purchase_id: purchaseId,
      purchase_no: purchaseNo,
      total: totalAmount,
    };

  } catch (error) {

    await connection.rollback();
    throw error;

  } finally {

    connection.release();

  }
};

/**
 * Get All Purchases
 */
export const getAllPurchases = async () => {

  const [purchases] = await pool.query(
    `SELECT
        p.id,
        p.purchase_no,
        p.purchase_date,
        p.total,
        p.status,
        s.id AS supplier_id,
        s.supplier_name
     FROM purchases p
     INNER JOIN suppliers s
        ON p.supplier_id = s.id
     ORDER BY p.id DESC`
  );

  return purchases;

};

export const getPurchaseById = async (purchaseId) => {

  // Purchase Header
  const [purchase] = await pool.query(
    `SELECT
        p.id,
        p.purchase_no,
        p.purchase_date,
        p.total,
        p.remarks,
        p.status,
        s.id AS supplier_id,
        s.supplier_name
     FROM purchases p
     INNER JOIN suppliers s
        ON p.supplier_id = s.id
     WHERE p.id = ?`,
    [purchaseId]
  );

  if (purchase.length === 0) {
    throw new ApiError(404, "Purchase not found");
  }

  // Purchase Items
  const [items] = await pool.query(
    `SELECT
        pi.id,
        pi.product_id,
        pr.product_name,
        pi.quantity,
        pi.purchase_price,
        pi.subtotal
     FROM purchase_items pi
     INNER JOIN products pr
        ON pi.product_id = pr.id
     WHERE pi.purchase_id = ?`,
    [purchaseId]
  );

  return {
    ...purchase[0],
    items,
  };
};

export const cancelPurchase = async (purchaseId) => {

  const connection = await pool.getConnection();

  try {

    await connection.beginTransaction();

    // Check purchase
    const [purchase] = await connection.query(
      `SELECT id, status
       FROM purchases
       WHERE id = ?`,
      [purchaseId]
    );

    if (purchase.length === 0) {
      throw new ApiError(404, "Purchase not found");
    }

    if (purchase[0].status === "Cancelled") {
      throw new ApiError(400, "Purchase is already cancelled");
    }

    // Get purchase items
    const [items] = await connection.query(
      `SELECT
          product_id,
          quantity
       FROM purchase_items
       WHERE purchase_id = ?`,
      [purchaseId]
    );

    // Reverse stock
    for (const item of items) {

      await connection.query(
        `UPDATE products
         SET quantity = quantity - ?
         WHERE id = ?`,
        [
          item.quantity,
          item.product_id,
        ]
      );

    }

    // Update purchase status
    await connection.query(
      `UPDATE purchases
       SET status = 'Cancelled'
       WHERE id = ?`,
      [purchaseId]
    );

    await connection.commit();

    return {
      purchase_id: Number(purchaseId),
      status: "Cancelled",
    };

  } catch (error) {

    await connection.rollback();
    throw error;

  } finally {

    connection.release();

  }

};