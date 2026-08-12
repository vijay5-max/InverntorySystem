import pool from "../config/db.js";

/**
 * Sales Report
 */
export const getSalesReport = async () => {

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
     ORDER BY s.sale_date DESC`
  );

  const grandTotal = sales.reduce(
    (sum, sale) => sum + Number(sale.total_amount),
    0
  );

  return {
    sales,
    grandTotal,
  };

};

/**
 * Purchase Report
 */
export const getPurchaseReport = async () => {

  const [purchases] = await pool.query(`
    SELECT
      p.id,
      p.purchase_no,
      s.supplier_name,
      p.purchase_date,
      p.total
    FROM purchases p
    INNER JOIN suppliers s
      ON p.supplier_id = s.id
    ORDER BY p.purchase_date DESC
  `);

  const grandTotal = purchases.reduce(
    (sum, purchase) => sum + Number(purchase.total),
    0
  );

  return {
    purchases,
    grandTotal,
  };

};

/**
 * Stock Report
 */
export const getStockReport = async () => {

  const [products] = await pool.query(`
    SELECT
      p.id,
      p.barcode,
      p.product_name,
      c.category_name,
      p.brand,
      p.purchase_price,
      p.selling_price,
      p.quantity,
      p.status
    FROM products p
    INNER JOIN categories c
      ON p.category_id = c.id
    ORDER BY p.product_name
  `);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.quantity),
    0
  );

  const stockValue = products.reduce(
    (sum, product) =>
      sum +
      Number(product.purchase_price) *
      Number(product.quantity),
    0
  );

  return {
    products,
    totalProducts,
    totalStock,
    stockValue,
  };

};

/**
 * Profit Report
 */
export const getProfitReport = async () => {

  const [profit] = await pool.query(`
    SELECT
      p.id,
      p.product_name,

      SUM(si.quantity) AS sold_quantity,

      SUM(si.subtotal) AS sales_amount,

      SUM(si.quantity * p.purchase_price) AS purchase_cost,

      (
        SUM(si.subtotal) -
        SUM(si.quantity * p.purchase_price)
      ) AS profit

    FROM sale_items si

    INNER JOIN products p
      ON si.product_id = p.id

    GROUP BY
      p.id,
      p.product_name,
      p.purchase_price

    ORDER BY profit DESC
  `);

  const totalSales = profit.reduce(
    (sum, item) => sum + Number(item.sales_amount),
    0
  );

  const totalCost = profit.reduce(
    (sum, item) => sum + Number(item.purchase_cost),
    0
  );

  const totalProfit = profit.reduce(
    (sum, item) => sum + Number(item.profit),
    0
  );

  return {
    profit,
    totalSales,
    totalCost,
    totalProfit,
  };

};

export const getMonthlySales = async () => {
  const [rows] = await pool.query(`
    SELECT
      MONTH(sale_date) AS month_number,
      COALESCE(SUM(total_amount), 0) AS total_sales
    FROM sales
    GROUP BY MONTH(sale_date)
    ORDER BY month_number
  `);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlySales = months.map((month, index) => {
    const found = rows.find(
      (row) => Number(row.month_number) === index + 1
    );

    return {
      month,
      sales: found ? Number(found.total_sales) : 0,
    };
  });

  return monthlySales;
};