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

    if (!window.confirm("Delete this product?"))
      return;

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
  // Search (Client-side)
  // ============================

  const filteredProducts =
    products.filter((product) =>
      product.product_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <button
          onClick={() => {

            setSelectedProduct(null);

            setShowForm(true);

          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>

      </div>

      <div className="mb-4">

        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg px-3 py-2 w-80"
        />

      </div>

      {loading ? (

        <p>Loading...</p>

      ) : (

        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      )}

      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-xl shadow-xl p-6 w-[700px]">

            <h2 className="text-2xl font-bold mb-5">

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