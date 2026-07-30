import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";

import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";

const router = Router();

// Create Customer
router.post("/", authenticate, createCustomer);

// Get All Customers
router.get("/", authenticate, getAllCustomers);

// Get Customer By ID
router.get("/:id", authenticate, getCustomerById);

// Update Customer
router.put("/:id", authenticate, updateCustomer);

// Soft Delete Customer
router.delete("/:id", authenticate, deleteCustomer);

export default router;