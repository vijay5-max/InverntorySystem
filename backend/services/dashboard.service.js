import pool from "../config/db.js";

export const getDashboardData = async () => {

  // ==============================
  // Total Products
  // ==============================

  const [[products]] = await pool.query(`
    SELECT COUNT(*) AS totalProducts
    FROM products
    WHERE status = 'Active'
  `);


  // ==============================
  // Total Categories
  // ==============================

  const [[categories]] = await pool.query(`
    SELECT COUNT(*) AS totalCategories
    FROM categories
    WHERE status = 'Active'
  `);


  // ==============================
  // Total Customers
  // ==============================

  const [[customers]] = await pool.query(`
    SELECT COUNT(*) AS totalCustomers
    FROM customers
    WHERE status = 'Active'
  `);


  // ==============================
  // Total Suppliers
  // ==============================

  const [[suppliers]] = await pool.query(`
    SELECT COUNT(*) AS totalSuppliers
    FROM suppliers
    WHERE status = 'Active'
  `);


  // ==============================
  // Total Purchases
  // ==============================

  const [[purchaseCount]] = await pool.query(`
    SELECT COUNT(*) AS totalPurchases
    FROM purchases
  `);


  // ==============================
  // Total Sales
  // ==============================

  const [[saleCount]] = await pool.query(`
    SELECT COUNT(*) AS totalSales
    FROM sales
  `);


  // ==============================
  // Purchase Amount
  // ==============================

  const [[purchaseAmount]] = await pool.query(`
    SELECT IFNULL(SUM(total), 0) AS purchaseAmount
    FROM purchases
  `);


  // ==============================
  // Sales Amount
  // ==============================

  const [[salesAmount]] = await pool.query(`
    SELECT IFNULL(SUM(total_amount), 0) AS salesAmount
    FROM sales
  `);


  // ==============================
  // Low Stock Products
  // ==============================

  const [[lowStock]] = await pool.query(`
    SELECT COUNT(*) AS lowStockProducts
    FROM products
    WHERE quantity < 10
      AND status = 'Active'
  `);

  const [lowStockProductsList] = await pool.query(`
  SELECT
    id,
    product_name,
    quantity
  FROM products
  WHERE quantity < 10
    AND status = 'Active'
  ORDER BY quantity ASC
  LIMIT 5
`);


  // ==============================
  // Today's Sales
  // ==============================

  const [[todaySales]] = await pool.query(`
    SELECT IFNULL(SUM(total_amount), 0) AS todaySales
    FROM sales
    WHERE DATE(sale_date) = CURDATE()
  `);


  // ==============================
  // Today's Purchases
  // ==============================

  const [[todayPurchases]] = await pool.query(`
    SELECT IFNULL(SUM(total), 0) AS todayPurchases
    FROM purchases
    WHERE DATE(purchase_date) = CURDATE()
  `);


  // ==============================
  // Monthly Sales
  // ==============================

  const [monthlySales] = await pool.query(`
    SELECT
      YEAR(sale_date) AS year,
      MONTH(sale_date) AS month_no,
      DATE_FORMAT(MIN(sale_date), '%b') AS month,
      SUM(total_amount) AS sales
    FROM sales
    GROUP BY
      YEAR(sale_date),
      MONTH(sale_date)
    ORDER BY
      YEAR(sale_date),
      MONTH(sale_date)
  `);


  // ==============================
  // Recent Sales
  // ==============================

  const [recentSales] = await pool.query(`
    SELECT
      s.id,
      s.invoice_no,
      c.name AS customer_name,
      s.sale_date,
      s.total_amount
    FROM sales s
    INNER JOIN customers c
      ON s.customer_id = c.id
    ORDER BY s.id DESC
    LIMIT 5
  `);


  // ==============================
  // Return Dashboard Data
  // ==============================

  return {

    totalProducts: products.totalProducts,

    totalCategories: categories.totalCategories,

    totalCustomers: customers.totalCustomers,

    totalSuppliers: suppliers.totalSuppliers,

    totalPurchases: purchaseCount.totalPurchases,

    totalSales: saleCount.totalSales,

    purchaseAmount: purchaseAmount.purchaseAmount,

    salesAmount: salesAmount.salesAmount,

    lowStockProducts: lowStock.lowStockProducts,

    todaySales: todaySales.todaySales,

    todayPurchases: todayPurchases.todayPurchases,

    // IMPORTANT:
    // monthlySales is already an array
    monthlySales: monthlySales,

    // IMPORTANT:
    // recentSales is already an array
    recentSales: recentSales,
    lowStockProducts: lowStock.lowStockProducts,
    lowStockProductsList,
    

  };
};