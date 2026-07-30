import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";

import {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
} from "../controllers/supplier.controller.js";

const router = Router();

router.post("/",authenticate,createSupplier);
router.get("/",authenticate,getAllSuppliers);
router.get("/:id",authenticate,getSupplierById);
router.put("/:id",authenticate,updateSupplier);
router.delete("/:id",authenticate,deleteSupplier);

export default router;

