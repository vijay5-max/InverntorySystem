import * as productService from "../services/product.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);

  return ApiResponse.success(
    res,
    product,
    "Product created successfully",
    201
  );
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts(req.query);

  return ApiResponse.success(
    res,
    products,
    "Products fetched successfully"
  );
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  return ApiResponse.success(
    res,
    product,
    "Product fetched successfully"
  );
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    product,
    "Product updated successfully"
  );
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const result = await productService.deleteProduct(req.params.id);

  return ApiResponse.success(
    res,
    result,
    result.message
  );
});