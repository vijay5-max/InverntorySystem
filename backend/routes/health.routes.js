import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();

    await connection.ping();

    connection.release();

    res.status(200).json({
      success: true,
      message: "Database Connected Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

export default router;