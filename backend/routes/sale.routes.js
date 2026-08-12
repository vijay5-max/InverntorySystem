import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";

import {
  createSale,
  getAllSales,
  getSaleById,
  cancelSale,
} from "../controllers/sale.controller.js";

const router = Router();

// Create Sale
router.post("/", authenticate, createSale);

// Get All Sales
router.get("/", authenticate, getAllSales);

// Get Sale By ID
router.get("/:id", authenticate, getSaleById);

// Cancel Sale
router.put("/:id/cancel", authenticate, cancelSale);


export default router;