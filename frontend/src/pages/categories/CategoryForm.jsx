import { useEffect, useState } from "react";
import { FolderPlus, X } from "lucide-react";

const CategoryForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    category_name: "",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        category_name: initialData.category_name || "",
        status: initialData.status || "Active",
      });
    } else {
      setFormData({
        category_name: "",
        status: "Active",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.category_name.trim()) {
      alert("Category name is required");
      return;
    }

    onSubmit(formData);
  };

  const isEdit = Boolean(initialData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <FolderPlus size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEdit ? "Edit Category" : "Add Category"}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {isEdit
                  ? "Update category information"
                  : "Create a new product category"}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onCancel}
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
            title="Close"
          >
            <X size={19} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          {/* Category Name */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Category Name
            </label>

            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              placeholder="Enter category name"
              autoFocus
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
                dark:focus:bg-slate-800
              "
            />

          </div>

          {/* Status */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
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
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:focus:bg-slate-800
              "
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">

            <button
              type="button"
              onClick={onCancel}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                px-5
                py-2.5
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-50
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-200
                dark:hover:bg-slate-700
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                rounded-xl
                bg-blue-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-blue-700
                hover:shadow-md
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading
                ? "Saving..."
                : isEdit
                ? "Update Category"
                : "Add Category"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CategoryForm;