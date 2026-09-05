import { useEffect, useState } from "react";
import {
  Package,
  ScanBarcode,
  Tags,
  IndianRupee,
  Boxes,
  Palette,
  Ruler,
  Image,
  Tag,
} from "lucide-react";

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
    } else {
      setFormData({
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

  const isEdit = Boolean(initialData);

  const inputClass = `
    w-full
    rounded-xl
    border border-slate-200
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
  `;

  const labelClass = `
    mb-2
    block
    text-sm
    font-semibold
    text-slate-700
    dark:text-slate-300
  `;

  return (
    <form onSubmit={handleSubmit} 
    className="grid grid-cols-1 gap-5 md:grid-cols-2">

      {/* Product Name */}
      <div className="md:col-span-2">
        <label className={labelClass}>
          Product Name
        </label>

        <div className="relative">
          <Package
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            placeholder="Enter product name"
            className={`${inputClass} pl-11`}
          />
        </div>
      </div>

      {/* Category + Barcode */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div>
          <label className={labelClass}>
            Category
          </label>

          <div className="relative">
            <Tags
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className={`${inputClass} appearance-none pl-11`}
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
        </div>

        <div>
          <label className={labelClass}>
            Barcode
          </label>

          <div className="relative">
            <ScanBarcode
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
              placeholder="Enter barcode"
              className={`${inputClass} pl-11`}
            />
          </div>
        </div>

      </div>

      {/* Pricing */}
      <div className="md:col-span-2">
        <div className="mb-3 flex items-center gap-2">
          <IndianRupee
            size={18}
            className="text-blue-600 dark:text-blue-400"
          />

          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Pricing
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>
            <label className={labelClass}>
              Purchase Price
            </label>

            <input
              type="number"
              name="purchase_price"
              value={formData.purchase_price}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Selling Price
            </label>

            <input
              type="number"
              name="selling_price"
              value={formData.selling_price}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className={inputClass}
            />
          </div>

        </div>
      </div>

      {/* Inventory */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Boxes
            size={18}
            className="text-blue-600 dark:text-blue-400"
          />

          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Inventory Details
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          <div>
            <label className={labelClass}>
              Quantity
            </label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Brand
            </label>

            <div className="relative">
              <Tag
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand"
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Size
            </label>

            <div className="relative">
              <Ruler
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="Size"
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Color */}
      <div>
        <label className={labelClass}>
          Color
        </label>

        <div className="md:col-span-2">
          <Palette
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Enter color"
            className={`${inputClass} pl-11`}
          />
        </div>
      </div>

      {/* Image */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Image
            size={18}
            className="text-slate-500 dark:text-slate-400"
          />

          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Product Image
          </label>
        </div>

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className={inputClass}
        />

        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
          Add a public image URL for the product.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">

        <button
          type="button"
          onClick={onCancel}
          className="
            rounded-xl
            border border-slate-200
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
            ? "Update Product"
            : "Save Product"}
        </button>

      </div>

    </form>
  );
}