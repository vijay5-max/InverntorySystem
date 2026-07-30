import * as categoryService from "../services/category.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createCategory = async (req, res, next) => {
  try {
    const result = await categoryService.createCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();

  return ApiResponse.success(
    res,
    categories,
    "Categories fetched successfully"
  );
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);

  return ApiResponse.success(
    res,
    category,
    "Category fetched successfully"
  );
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const result = await categoryService.deleteCategory(req.params.id);

  return ApiResponse.success(
    res,
    result,
    result.message
  );
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    category,
    "Category updated successfully"
  );
});