import { useEffect, useState } from "react";

import productService from "../../services/product.service";
import categoryService from "../../services/category.service";

import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");

  // ============================
  // Load Products
  // ============================

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response =
        await productService.getProducts();

      setProducts(response.data);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Load Categories
  // ============================

  const loadCategories = async () => {
    try {
      const response =
        await categoryService.getCategories();

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  // ============================
  // Create
  // ============================

  const handleCreate = async (data) => {
    try {
      await productService.createProduct(data);

      alert("Product created successfully.");

      setShowForm(false);

      loadProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to create product."
      );
    }
  };

  // ============================
  // Edit
  // ============================

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  // ============================
  // Update
  // ============================

  const handleUpdate = async (data) => {
    try {
      await productService.updateProduct(
        selectedProduct.id,
        data
      );

      alert("Product updated.");

      setSelectedProduct(null);
      setShowForm(false);

      loadProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update product."
      );
    }
  };

  // ============================
  // Delete
  // ============================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) {
      return;
    }

    try {
      await productService.deleteProduct(id);

      alert("Product deleted.");

      loadProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to delete product."
      );
    }
  };

  // ============================
  // Search
  // ============================

  const filteredProducts = products.filter((product) =>
    product.product_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-full p-6 text-black dark:text-white">

      {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Products
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Manage your clothing catalogue, pricing and stock
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedProduct(null);
                setShowForm(true);
              }}
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-blue-700
                hover:shadow-md
              "
            >
              + Add Product
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
                text-sm
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:border-blue-500
                dark:focus:bg-slate-800
              "
            />
          </div>
        </div>
      {/* Search */}
      <div className="mb-4">

        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-80
            rounded-lg
            border
            border-gray-300
            bg-white
            px-3
            py-2
            text-black
            outline-none
            placeholder:text-gray-400
            focus:border-blue-500
            dark:border-slate-600
            dark:bg-slate-900
            dark:text-white
            dark:placeholder:text-gray-500
          "
        />

      </div>

      {/* Products */}
      {loading ? (

        <p className="text-gray-600 dark:text-gray-300">
          Loading...
        </p>

      ) : (

        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      )}

      {/* Add/Edit Product Modal */}
      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div
            className="
                w-full
                max-w-5xl
                max-h-[90vh]
                overflow-y-auto
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                text-black
                shadow-2xl
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
            "
          >

            <h2 className="mb-5 text-2xl font-bold text-black dark:text-white">

              {selectedProduct
                ? "Edit Product"
                : "Add Product"}

            </h2>

            <ProductForm
              initialData={selectedProduct}
              categories={categories}
              onSubmit={
                selectedProduct
                  ? handleUpdate
                  : handleCreate
              }
              onCancel={() => {
                setShowForm(false);
                setSelectedProduct(null);
              }}
            />

          </div>

        </div>

      )}

    </div>
  );
}