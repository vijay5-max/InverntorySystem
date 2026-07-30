import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";

import {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  cancelPurchase,
} from "../controllers/purchase.controller.js";

const router = Router();

router.post("/", authenticate, createPurchase);

router.get("/", authenticate,getAllPurchases);

router.get("/:id", authenticate, getPurchaseById);

router.put("/:id/cancel",authenticate,cancelPurchase);

export default router;