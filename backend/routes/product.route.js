import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import { 
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
 } from "../controllers/product.controller.js";


const router = Router();

router.post("/", authenticate, createProduct);
router.get("/", authenticate, getAllProducts);
router.get("/:id",authenticate,getProductById);
router.put("/:id",authenticate,updateProduct);
router.delete("/:id",authenticate,deleteProduct);

export default router;