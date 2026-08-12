import { Router } from "express";

import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import categoryRoutes from "./category.routes.js";
import productRoutes from "./product.route.js";
import supplierRoutes from "./supplier.routes.js";
import purchaseRoutes from "./purchase.routes.js";
import customerRoutes from "./customer.routes.js";
import saleRoutes from "./sale.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import reportRoutes from "./report.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth",authRoutes);
router.use("/users",userRoutes);
router.use("/categories",categoryRoutes);
router.use("/products",productRoutes);
router.use("/suppliers",supplierRoutes);
router.use("/purchases",purchaseRoutes);
router.use("/customers",customerRoutes);
router.use("/sales",saleRoutes);
router.use("/dashboard",dashboardRoutes);
router.use("/reports",reportRoutes);

export default router;