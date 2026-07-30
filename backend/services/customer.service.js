import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create Customer
 */
export const createCustomer = async (customerData) => {

  const {
    name,
    phone,
    email,
    address,
  } = customerData;

  if (!name) {
    throw new ApiError(400, "Customer name is required");
  }

  const [existing] = await pool.query(
    `SELECT id
     FROM customers
     WHERE phone = ?`,
    [phone]
  );

  if (existing.length > 0) {
    throw new ApiError(400, "Phone number already exists");
  }

  const [result] = await pool.query(
    `INSERT INTO customers
    (
      name,
      phone,
      email,
      address
    )
    VALUES (?, ?, ?, ?)`,
    [
      name,
      phone,
      email,
      address,
    ]
  );

  return {
    id: result.insertId,
  };

};

/**
 * Get All Customers
 */
export const getAllCustomers = async () => {

  const [customers] = await pool.query(
    `SELECT
        id,
        name,
        phone,
        email,
        address,
        status,
        created_at
     FROM customers
     WHERE status = 'Active'
     ORDER BY id DESC`
  );

  return customers;

};

/**
 * Get Customer By ID
 */
export const getCustomerById = async (id) => {

  const [customer] = await pool.query(
    `SELECT *
     FROM customers
     WHERE id = ?
     AND status = 'Active'`,
    [id]
  );

  if (customer.length === 0) {
    throw new ApiError(404, "Customer not found");
  }

  return customer[0];

};

/**
 * Update Customer
 */
export const updateCustomer = async (id, customerData) => {

  const {
    name,
    phone,
    email,
    address,
  } = customerData;

  const [customer] = await pool.query(
    `SELECT id
     FROM customers
     WHERE id = ?`,
    [id]
  );

  if (customer.length === 0) {
    throw new ApiError(404, "Customer not found");
  }

  const [duplicate] = await pool.query(
    `SELECT id
     FROM customers
     WHERE phone = ?
     AND id != ?`,
    [phone, id]
  );

  if (duplicate.length > 0) {
    throw new ApiError(400, "Phone number already exists");
  }

  await pool.query(
    `UPDATE customers
     SET
        name = ?,
        phone = ?,
        email = ?,
        address = ?
     WHERE id = ?`,
    [
      name,
      phone,
      email,
      address,
      id,
    ]
  );

  return {
    id: Number(id),
  };

};

/**
 * Delete Customer
 */
export const deleteCustomer = async (id) => {

  const [customer] = await pool.query(
    `SELECT id
     FROM customers
     WHERE id = ?`,
    [id]
  );

  if (customer.length === 0) {
    throw new ApiError(404, "Customer not found");
  }

  await pool.query(
    `UPDATE customers
     SET status = 'Inactive'
     WHERE id = ?`,
    [id]
  );

  return {
    id: Number(id),
  };

};