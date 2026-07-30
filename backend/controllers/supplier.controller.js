import * as supplierService from "../services/supplier.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createSupplier = asyncHandler(async(req,res)=>{

    const supplier =
        await supplierService.createSupplier(req.body);

    return ApiResponse.success(
        res,
        supplier,
        "Supplier created successfully",
        201
    );

});

export const getAllSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await supplierService.getAllSuppliers(req.query);

  return ApiResponse.success(
    res,
    suppliers,
    "Suppliers fetched successfully"
  );
});

export const getSupplierById = asyncHandler(async (req, res) => {
  const supplier = await supplierService.getSupplierById(req.params.id);

  return ApiResponse.success(
    res,
    supplier,
    "Supplier fetched successfully"
  );
});

export const updateSupplier = asyncHandler(async (req, res) => {
  const supplier = await supplierService.updateSupplier(
    req.params.id,
    req.body
  );

  return ApiResponse.success(
    res,
    supplier,
    "Supplier updated successfully"
  );
});

export const deleteSupplier = asyncHandler(async (req, res) => {

  const result =
    await supplierService.deleteSupplier(req.params.id);

  return ApiResponse.success(
    res,
    result,
    result.message
  );

});