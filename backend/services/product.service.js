import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";

export const createProduct = async (productData) => {
  const {
    product_name,
    category_id,
    barcode,
    purchase_price,
    selling_price,
    quantity,
    color,
    size,
    brand,
    image,
  } = productData;

  // Check if category exists
  const [categories] = await pool.query(
    "SELECT id FROM categories WHERE id = ? AND status = 'Active'",
    [category_id]
  );

  if (categories.length === 0) {
    throw new ApiError(404, "Category not found or inactive");
  }

  // Generate SKU
  const [countResult] = await pool.query(
    "SELECT COUNT(*) AS total FROM products"
  );

  const sku = `SKU${String(countResult[0].total + 1).padStart(6, "0")}`;

  // Insert product
  const [result] = await pool.query(
    `INSERT INTO products
    (
      product_name,
      category_id,
      sku,
      barcode,
      purchase_price,
      selling_price,
      quantity,
      color,
      size,
      brand,
      image
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      product_name,
      category_id,
      sku,
      barcode || null,
      purchase_price,
      selling_price,
      quantity || 0,
      color || null,
      size || null,
      brand || null,
      image || null,
    ]
  );

  const [product] = await pool.query(
    "SELECT * FROM products WHERE id = ?",
    [result.insertId]
  );

  return product[0];
};

export const getAllProducts = async (query) => {
  const {
    search = "",
    category = "",
    page = 1,
    limit = 10,
  } = query;

  const offset = (page - 1) * limit;

  let sql = `
    SELECT
      p.id,
      p.product_name,
      p.sku,
      p.purchase_price,
      p.selling_price,
      p.quantity,
      p.status,
      c.category_name
    FROM products p
    INNER JOIN categories c
      ON p.category_id = c.id
    WHERE 1 = 1
  `;

  const params = [];

  if (search) {
    sql += " AND p.product_name LIKE ?";
    params.push(`%${search}%`);
  }

  if (category) {
    sql += " AND p.category_id = ?";
    params.push(category);
  }

  sql += `
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `;

  params.push(Number(limit), Number(offset));

  const [products] = await pool.query(sql, params);

  return products;
};

export const getProductById = async (id) => {
  const [products] = await pool.query(
    `SELECT
        p.*,
        c.category_name
     FROM products p
     INNER JOIN categories c
       ON p.category_id = c.id
     WHERE p.id = ?`,
    [id]
  );

  if (products.length === 0) {
    throw new ApiError(404, "Product not found");
  }

  return products[0];
};

export const updateProduct = async (id, productData) => {
  const {
    product_name,
    category_id,
    barcode,
    purchase_price,
    selling_price,
    quantity,
    color,
    size,
    brand,
    image,
    status,
  } = productData;

  // Check if product exists
  const [existingProduct] = await pool.query(
    "SELECT id FROM products WHERE id = ?",
    [id]
  );

  if (existingProduct.length === 0) {
    throw new ApiError(404, "Product not found");
  }

  // Check category
  const [categories] = await pool.query(
    "SELECT id FROM categories WHERE id = ? AND status = 'Active'",
    [category_id]
  );

  if (categories.length === 0) {
    throw new ApiError(404, "Category not found or inactive");
  }

  // Business validations
  if (Number(selling_price) < Number(purchase_price)) {
    throw new ApiError(
      400,
      "Selling price cannot be less than purchase price"
    );
  }

  if (Number(quantity) < 0) {
    throw new ApiError(
      400,
      "Quantity cannot be negative"
    );
  }

  // Update
  await pool.query(
    `UPDATE products
     SET
       product_name = ?,
       category_id = ?,
       barcode = ?,
       purchase_price = ?,
       selling_price = ?,
       quantity = ?,
       color = ?,
       size = ?,
       brand = ?,
       image = ?,
       status = ?
     WHERE id = ?`,
    [
      product_name,
      category_id,
      barcode,
      purchase_price,
      selling_price,
      quantity,
      color,
      size,
      brand,
      image,
      status || "Active",
      id,
    ]
  );

  return await getProductById(id);
};

export const deleteProduct = async (id) => {
  const [products] = await pool.query(
    "SELECT id FROM products WHERE id = ?",
    [id]
  );

  if (products.length === 0) {
    throw new ApiError(404, "Product not found");
  }

  await pool.query(
    `DELETE FROM products
     WHERE id = ?`,
    [id]
  );

  return {
    message: "Product deleted successfully",
  };
};
