import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";

export const createSupplier = async (supplierData) => {

    const {
        supplier_name,
        contact_person,
        phone,
        email,
        address,
        gst_number
    } = supplierData;

    const [existing] = await pool.query(
        "SELECT id FROM suppliers WHERE supplier_name = ?",
        [supplier_name]
    );

    if(existing.length > 0){
        throw new ApiError(
            409,
            "Supplier already exists"
        );
    }

    const [result] = await pool.query(
        `INSERT INTO suppliers
        (
            supplier_name,
            contact_person,
            phone,
            email,
            address,
            gst_number
        )
        VALUES (?,?,?,?,?,?)`,
        [
            supplier_name,
            contact_person,
            phone,
            email,
            address,
            gst_number
        ]
    );

    const [supplier] = await pool.query(
        "SELECT * FROM suppliers WHERE id=?",
        [result.insertId]
    );

    return supplier[0];

};

export const getAllSuppliers = async (query) => {
  const {
    search = "",
    page = 1,
    limit = 10,
  } = query;

  const offset = (page - 1) * Number(limit);

  let sql = `
    SELECT
      id,
      supplier_name,
      contact_person,
      phone,
      email,
      address,
      gst_number,
      status,
      created_at
    FROM suppliers
    WHERE 1 = 1
  `;

  const params = [];

  if (search) {
    sql += `
      AND (
        supplier_name LIKE ?
        OR contact_person LIKE ?
        OR phone LIKE ?
      )
    `;

    params.push(
      `%${search}%`,
      `%${search}%`,
      `%${search}%`
    );
  }

  sql += `
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  params.push(Number(limit), offset);

  const [suppliers] = await pool.query(sql, params);

  return suppliers;
};

export const getSupplierById = async (id) => {
  const [suppliers] = await pool.query(
    `SELECT
      id,
      supplier_name,
      contact_person,
      phone,
      email,
      address,
      gst_number,
      status,
      created_at
     FROM suppliers
     WHERE id = ?`,
    [id]
  );

  if (suppliers.length === 0) {
    throw new ApiError(404, "Supplier not found");
  }

  return suppliers[0];
};

export const updateSupplier = async (id, supplierData) => {
  const {
    supplier_name,
    contact_person,
    phone,
    email,
    address,
    gst_number,
    status,
  } = supplierData;

  // Check supplier exists
  const [existing] = await pool.query(
    "SELECT id FROM suppliers WHERE id = ?",
    [id]
  );

  if (existing.length === 0) {
    throw new ApiError(404, "Supplier not found");
  }

  await pool.query(
    `UPDATE suppliers
     SET
        supplier_name = ?,
        contact_person = ?,
        phone = ?,
        email = ?,
        address = ?,
        gst_number = ?,
        status = ?
     WHERE id = ?`,
    [
      supplier_name,
      contact_person,
      phone,
      email,
      address,
      gst_number,
      status || "Active",
      id,
    ]
  );

  return await getSupplierById(id);
};

export const deleteSupplier = async (id) => {
  // Check supplier exists
  const [supplier] = await pool.query(
    "SELECT id FROM suppliers WHERE id = ?",
    [id]
  );

  if (supplier.length === 0) {
    throw new ApiError(404, "Supplier not found");
  }

  // Soft delete
  await pool.query(
    `UPDATE suppliers
     SET status = 'Inactive'
     WHERE id = ?`,
    [id]
  );

  return {
    message: "Supplier deleted successfully",
  };
};