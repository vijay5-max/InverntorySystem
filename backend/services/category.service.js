import pool from "../config/db.js";

export const createCategory = async (categoryData) => {
  const { category_name, description, status = "Active" } = categoryData;

  // Check duplicate category
  const [existing] = await pool.query(
    "SELECT id FROM categories WHERE category_name = ?",
    [category_name]
  );

  if (existing.length > 0) {
    throw new Error("Category already exists");
  }

  // Insert category
  const [result] = await pool.query(
    `INSERT INTO categories (category_name, description, status)
     VALUES (?, ?, ?)`,
    [category_name, description, status]
  );

  return {
    id: result.insertId,
    category_name,
    description,
    status,
  };
};

export const getAllCategories = async () => {
  const [categories] = await pool.query(
    `SELECT
      id,
      category_name,
      description,
      status,
      created_at,
      updated_at
     FROM categories
     ORDER BY created_at DESC`
  );

  return categories;
};

export const getCategoryById = async (id) => {
  const [categories] = await pool.query(
    `SELECT
      id,
      category_name,
      description,
      status,
      created_at,
      updated_at
     FROM categories
     WHERE id = ?`,
    [id]
  );

  if (categories.length === 0) {
    throw new Error("Category not found");
  }

  return categories[0];
};

export const updateCategory = async (id, categoryData) => {
  const { category_name, description, status } = categoryData;

  // Check if category exists
  const [existingCategory] = await pool.query(
    "SELECT * FROM categories WHERE id = ?",
    [id]
  );

  if (existingCategory.length === 0) {
    throw new Error("Category not found");
  }

  // Check duplicate name (ignore current category)
  const [duplicate] = await pool.query(
    "SELECT id FROM categories WHERE category_name = ? AND id != ?",
    [category_name, id]
  );

  if (duplicate.length > 0) {
    throw new Error("Category name already exists");
  }

  // Update category
  await pool.query(
    `UPDATE categories
     SET category_name = ?, description = ?, status = ?
     WHERE id = ?`,
    [category_name, description, status, id]
  );

  // Return updated category
  const [updated] = await pool.query(
    "SELECT * FROM categories WHERE id = ?",
    [id]
  );

  return updated[0];
};

export const deleteCategory = async (id) => {
  // Check if category exists
  const [existing] = await pool.query(
    "SELECT * FROM categories WHERE id = ?",
    [id]
  );

  if (existing.length === 0) {
    throw new Error("Category not found");
  }

  // Soft delete
  await pool.query(
    `UPDATE categories
     SET status = 'Inactive'
     WHERE id = ?`,
    [id]
  );

  return {
    message: "Category deleted successfully"
  };
};