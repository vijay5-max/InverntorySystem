import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as customerService from "../services/customer.service.js";

/**
 * Create Customer
 */
export const createCustomer = asyncHandler(async (req, res) => {

  const customer = await customerService.createCustomer(req.body);

  return ApiResponse.success(
    res,
    customer,
    "Customer created successfully",
    201
  );

});

/**
 * Get All Customers
 */
export const getAllCustomers = asyncHandler(async (req, res) => {

  const customers = await customerService.getAllCustomers();

  return ApiResponse.success(
    res,
    customers,
    "Customers fetched successfully"
  );

});

/**
 * Get Customer By ID
 */
export const getCustomerById = asyncHandler(async (req, res) => {

  const customer = await customerService.getCustomerById(
    req.params.id
  );

  return ApiResponse.success(
    res,
    customer,
    "Customer fetched successfully"
  );

});

/**
 * Update Customer
 */
export const updateCustomer = asyncHandler(async (req, res) => {

  const customer = await customerService.updateCustomer(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    customer,
    "Customer updated successfully"
  );

});

/**
 * Soft Delete Customer
 */
export const deleteCustomer = asyncHandler(async (req, res) => {

  const customer = await customerService.deleteCustomer(
    req.params.id
  );

  return ApiResponse.success(
    res,
    customer,
    "Customer deleted successfully"
  );

});