import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as dashboardService from "../services/dashboard.service.js";

/**
 * Dashboard
 */
export const getDashboard = asyncHandler(async (req, res) => {

  const dashboard = await dashboardService.getDashboardData();

  return ApiResponse.success(
    res,
    dashboard,
    "Dashboard data fetched successfully"
  );

});