import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import * as reportService from "../services/report.service.js";

/**
 * Sales Report
 */
export const getSalesReport = asyncHandler(async (req, res) => {

  const data = await reportService.getSalesReport();

  return ApiResponse.success(
    res,
    data,
    "Sales report fetched successfully"
  );

});

/**
 * Purchase Report
 */
export const getPurchaseReport = asyncHandler(async (req, res) => {

  const data = await reportService.getPurchaseReport();

  return ApiResponse.success(
    res,
    data,
    "Purchase report fetched successfully"
  );

});

/**
 * Stock Report
 */
export const getStockReport = asyncHandler(async (req, res) => {

  const data = await reportService.getStockReport();

  return ApiResponse.success(
    res,
    data,
    "Stock report fetched successfully"
  );

});

/**
 * Profit Report
 */
export const getProfitReport = asyncHandler(async (req, res) => {

  const data = await reportService.getProfitReport();

  return ApiResponse.success(
    res,
    data,
    "Profit report fetched successfully"
  );

});

export const getMonthlySales = asyncHandler(async (req, res) => {
  const data = await reportService.getMonthlySales();

  return ApiResponse.success(
    res,
    data,
    "Monthly sales fetched successfully"
  );
});