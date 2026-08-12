import { Router } from "express";
import  authenticate  from "../middleware/auth.middleware.js";

import {
  getDashboard,
} from "../controllers/dashboard.controller.js";

const router = Router();

/**
 * Dashboard
 * GET /api/dashboard
 */
router.get("/", authenticate, getDashboard);

export default router;