import { useEffect, useState } from "react";

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

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <div>

        <label className="block mb-2 font-medium">
          Category Name
        </label>

        <input
          type="text"
          name="category_name"
          value={formData.category_name}
          onChange={handleChange}
          placeholder="Enter category name"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <div>

        <label className="block mb-2 font-medium">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>

        </select>

      </div>

      <div className="flex justify-end gap-3 pt-4">

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

      </div>

    </form>

  );

};

export default CategoryForm;