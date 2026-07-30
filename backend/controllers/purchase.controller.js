import * as purchaseService from "../services/purchase.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createPurchase = asyncHandler(async (req, res) => {

  const purchase = await purchaseService.createPurchase(
    req.body,
    req.user.id
  );

  return ApiResponse.success(
    res,
    purchase,
    "Purchase created successfully",
    201
  );
});

export const getAllPurchases = asyncHandler(async (req, res) => {

  const purchases = await purchaseService.getAllPurchases();

  return ApiResponse.success(
    res,
    purchases,
    "Purchases fetched successfully"
  );

});

export const getPurchaseById = asyncHandler(async (req, res) => {

  const purchase = await purchaseService.getPurchaseById(
    req.params.id
  );

  return ApiResponse.success(
    res,
    purchase,
    "Purchase fetched successfully"
  );

});

export const cancelPurchase = asyncHandler(async (req, res) => {

  const purchase = await purchaseService.cancelPurchase(
    req.params.id
  );

  return ApiResponse.success(
    res,
    purchase,
    "Purchase cancelled successfully"
  );

});