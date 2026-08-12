import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as saleService from "../services/sale.service.js";

/**
 * Create Sale
 */
export const createSale = asyncHandler(async (req, res) => {

  const sale = await saleService.createSale(
    req.body,
    req.user.id
  );

  return ApiResponse.success(
    res,
    sale,
    "Sale created successfully",
    201
  );

});

/**
 * Get All Sales
 */
export const getAllSales = asyncHandler(async (req, res) => {

  const sales = await saleService.getAllSales();

  return ApiResponse.success(
    res,
    sales,
    "Sales fetched successfully"
  );

});

/**
 * Get Sale By ID
 */
export const getSaleById = asyncHandler(async (req, res) => {

  const sale = await saleService.getSaleById(
    req.params.id
  );

  return ApiResponse.success(
    res,
    sale,
    "Sale fetched successfully"
  );

});

/**
 * Cancel Sale
 */
export const cancelSale = asyncHandler(async (req, res) => {

  const sale = await saleService.cancelSale(
    req.params.id
  );

  return ApiResponse.success(
    res,
    sale,
    "Sale cancelled successfully"
  );

});
