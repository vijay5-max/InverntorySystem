import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";

import {
  getSalesReport,
  getPurchaseReport,
  getStockReport,
  getProfitReport,
  getMonthlySales,
} from "../controllers/report.controller.js";

const router = Router();

// Sales Report
router.get("/sales", authenticate, getSalesReport);

// Purchase Report
router.get("/purchases", authenticate, getPurchaseReport);

// Stock Report
router.get("/stock", authenticate, getStockReport);

// Profit Report
router.get("/profit", authenticate, getProfitReport);

router.get("/monthly-sales",authenticate, getMonthlySales);

export default router;