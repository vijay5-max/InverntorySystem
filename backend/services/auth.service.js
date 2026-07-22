import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../config/db.js";

export const register = async (userData) => {
  const { name, username, password, role } = userData;

  //check if uername already exists
  const [existingUser] = await pool.query(
    "SELECT id FROM users WHERE username = ?",
    [username]
  );

  if (existingUser.length > 0) {
    throw new Error("Username already exists");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //Inster user
  const [result] = await pool.query(
    `INSERT INTO users (name, username, password, role)
     VALUES (?, ?, ?, ?)`,
    [
      name,
      username,
      hashedPassword,
      role || "admin",
    ]
  );

  return {
    id: result.insertId,
    name,
    username,
    role: role || "admin",
  };
};

export const login = async ({ username, password }) => {
  // Find user
  const [users] = await pool.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (users.length === 0) {
    throw new Error("Invalid username or password");
  }

  const user = users[0];

  // Compare password
  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid username or password");
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    },
  };
};