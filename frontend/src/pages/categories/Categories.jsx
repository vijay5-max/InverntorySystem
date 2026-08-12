import { useEffect, useState } from "react";

import categoryService from "../../services/category.service";
import CategoryTable from "./CategoryTable";
import CategoryForm from "./CategoryForm";

export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  // ============================
  // Load Categories
  // ============================

  const fetchCategories = async () => {

    try {

      setLoading(true);

      const response =
        await categoryService.getCategories();

      setCategories(response.data);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to fetch categories."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCategories();

  }, []);

  // ============================
  // Create
  // ============================

  const handleCreate = async (formData) => {

    try {

      await categoryService.createCategory(formData);

      alert("Category created successfully.");

      setShowForm(false);

      fetchCategories();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to create category."
      );

    }

  };

  // ============================
  // Edit
  // ============================

  const handleEdit = (category) => {

    setSelectedCategory(category);

    setShowForm(true);

  };

  // ============================
  // Update
  // ============================

  const handleUpdate = async (formData) => {

    try {

      await categoryService.updateCategory(
        selectedCategory.id,
        formData
      );

      alert("Category updated successfully.");

      setShowForm(false);

      setSelectedCategory(null);

      fetchCategories();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to update category."
      );

    }

  };

  // ============================
  // Delete
  // ============================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this category?"
      );

    if (!confirmDelete) return;

    try {

      await categoryService.deleteCategory(id);

      alert("Category deleted.");

      fetchCategories();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to delete category."
      );

    }

  };

  return (

    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <button
          onClick={() => {

            setSelectedCategory(null);

            setShowForm(true);

          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Category
        </button>

      </div>

      {loading ? (

        <p>Loading...</p>

      ) : (

        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      )}

      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-xl shadow-xl p-6 w-[450px]">

            <h2 className="text-2xl font-bold mb-5">

              {selectedCategory
                ? "Edit Category"
                : "Add Category"}

            </h2>

            <CategoryForm
              initialData={selectedCategory}
              onSubmit={
                selectedCategory
                  ? handleUpdate
                  : handleCreate
              }
              onCancel={() => {

                setShowForm(false);

                setSelectedCategory(null);

              }}
            />

          </div>

        </div>

      )}

    </div>

  );

}