import { useEffect, useState } from "react";

export default function ProductForm({
  initialData = null,
  categories = [],
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    product_name: "",
    category_id: "",
    barcode: "",
    purchase_price: "",
    selling_price: "",
    quantity: 0,
    color: "",
    size: "",
    brand: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        product_name: initialData.product_name || "",
        category_id: initialData.category_id || "",
        barcode: initialData.barcode || "",
        purchase_price: initialData.purchase_price || "",
        selling_price: initialData.selling_price || "",
        quantity: initialData.quantity || 0,
        color: initialData.color || "",
        size: initialData.size || "",
        brand: initialData.brand || "",
        image: initialData.image || "",
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

    if (!formData.product_name.trim()) {
      alert("Product name is required");
      return;
    }

    if (!formData.category_id) {
      alert("Please select a category");
      return;
    }

    if (!formData.purchase_price) {
      alert("Purchase price is required");
      return;
    }

    if (!formData.selling_price) {
      alert("Selling price is required");
      return;
    }

    onSubmit({
      ...formData,
      purchase_price: Number(formData.purchase_price),
      selling_price: Number(formData.selling_price),
      quantity: Number(formData.quantity),
      category_id: Number(formData.category_id),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4"
    >
      <div className="col-span-2">
        <label className="block mb-1 font-medium text-gray-700 text-sm">
          Product Name
        </label>

        <input
          type="text"
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          className="w-full border rounded p-2 border-gray-300 py-2.5"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700 text-sm">
          Category
        </label>

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="w-full border rounded p-2 border-gray-300 py-2.5"
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700 text-sm">
          Barcode
        </label>

        <input
          type="text"
          name="barcode"
          value={formData.barcode}
          onChange={handleChange}
          className="w-full border rounded p-2 border-gray-300 py-2.5"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700 text-sm">
          Purchase Price
        </label>

        <input
          type="number"
          name="purchase_price"
          value={formData.purchase_price}
          onChange={handleChange}
          className="w-full border rounded p-2 border-gray-300 py-2.5"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm text-gray-700">
          Selling Price
        </label>

        <input
          type="number"
          name="selling_price"
          value={formData.selling_price}
          onChange={handleChange}
          className="w-full border rounded p-2 border-gray-300 py-2.5"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700 text-sm">
          Quantity
        </label>

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border rounded p-2 border-gray-300 py-2.5"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm text-gray-700">
          Brand
        </label>

        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full border rounded p-2 border-gray-300 py-2.5"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm text-gray-700">
          Color
        </label>

        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="w-full border rounded p-2 border-gray-300 py-2.5"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm text-gray-700">
          Size
        </label>

        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full border rounded p-2 border-gray-300 py-2.5"
        />
      </div>

      <div className="col-span-2">
        <label className="block mb-1 font-medium text-gray-700 text-sm">
          Image URL
        </label>

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="col-span-2 flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}