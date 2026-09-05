import { useMemo, useState } from "react";
import {
  UserRound,
  CalendarDays,
  CreditCard,
  IndianRupee,
  ReceiptText,
  Plus,
  X,
  ShoppingCart,
  Tag,
  Percent,
} from "lucide-react";

import SaleItemRow from "./SaleItemRow";

export default function SaleForm({
  customers,
  products,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    customer_id: "",
    sale_date: new Date().toISOString().slice(0, 10),
    payment_method: "Cash",
    discount: 0,
    tax: 0,
    items: [
      {
        product_id: "",
        quantity: 1,
      },
    ],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];

    updatedItems[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          product_id: "",
          quantity: 1,
        },
      ],
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length === 1) return;

    const updatedItems = [...formData.items];

    updatedItems.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const subTotal = useMemo(() => {
    return formData.items.reduce((total, item) => {
      const product = products.find(
        (p) => p.id === Number(item.product_id)
      );

      if (!product) return total;

      return (
        total +
        Number(product.selling_price || 0) *
          Number(item.quantity || 0)
      );
    }, 0);
  }, [formData.items, products]);

  const grandTotal =
    subTotal -
    Number(formData.discount || 0) +
    Number(formData.tax || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.customer_id) {
      alert("Please select a customer.");
      return;
    }

    if (formData.items.length === 0) {
      alert("Please add at least one product.");
      return;
    }

    for (const item of formData.items) {
      if (!item.product_id) {
        alert("Please select all products.");
        return;
      }

      if (item.quantity <= 0) {
        alert("Quantity must be greater than zero.");
        return;
      }
    }

    onSubmit({
      customer_id: Number(formData.customer_id),
      sale_date: formData.sale_date,
      payment_method: formData.payment_method,
      discount: Number(formData.discount),
      tax: Number(formData.tax),
      items: formData.items,
    });
  };

  const inputClass = `
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
    transition-all
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
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <ReceiptText size={21} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              New Sale
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Create a new sales transaction
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCancel}
          title="Close"
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
        >
          <X size={20} />
        </button>
      </div>

      {/* Sale Information */}
      <div className="mb-7">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Sale Information
          </h3>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Select the customer, date and payment method
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Customer */}
          <div className="md:col-span-2">
            <label className={labelClass}>
              Customer
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                required
                className={`${inputClass} appearance-none pl-11`}
              >
                <option value="">
                  Select Customer
                </option>

                {customers.map((customer) => (
                  <option
                    key={customer.id}
                    value={customer.id}
                  >
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sale Date */}
          <div>
            <label className={labelClass}>
              Sale Date
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="date"
                name="sale_date"
                value={formData.sale_date}
                onChange={handleChange}
                required
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className={labelClass}>
              Payment Method
            </label>

            <div className="relative">
              <CreditCard
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                className={`${inputClass} appearance-none pl-11`}
              >
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Bank Transfer">
                  Bank Transfer
                </option>
              </select>
            </div>
          </div>

          {/* Discount */}
          <div>
            <label className={labelClass}>
              Discount
            </label>

            <div className="relative">
              <Tag
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="number"
                min="0"
                step="0.01"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="0.00"
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          {/* Tax */}
          <div>
            <label className={labelClass}>
              Tax
            </label>

            <div className="relative">
              <Percent
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="number"
                min="0"
                step="0.01"
                name="tax"
                value={formData.tax}
                onChange={handleChange}
                placeholder="0.00"
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="mb-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Sale Items
            </h3>

            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Select products and enter the quantity
            </p>
          </div>

          <button
            type="button"
            onClick={addItem}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-blue-200
              bg-blue-50
              px-4
              py-2.5
              text-sm
              font-semibold
              text-blue-600
              transition
              hover:bg-blue-100
              dark:border-blue-900
              dark:bg-blue-950/40
              dark:text-blue-400
              dark:hover:bg-blue-950/60
            "
          >
            <Plus size={17} />
            Add Product
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="min-w-[900px] w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Product
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Price
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Stock
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Qty
                </th>

                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Subtotal
                </th>

                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {formData.items.map((item, index) => (
                <SaleItemRow
                  key={index}
                  item={item}
                  index={index}
                  products={products}
                  onChange={handleItemChange}
                  onRemove={removeItem}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Subtotal */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <ShoppingCart size={16} />

            <p className="text-xs font-medium">
              Subtotal
            </p>
          </div>

          <p className="mt-2 flex items-center gap-1 text-xl font-bold text-slate-900 dark:text-white">
            <IndianRupee size={17} />
            {subTotal.toFixed(2)}
          </p>
        </div>

        {/* Discount */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Tag size={16} />

            <p className="text-xs font-medium">
              Discount
            </p>
          </div>

          <p className="mt-2 flex items-center gap-1 text-xl font-bold text-slate-900 dark:text-white">
            <IndianRupee size={17} />
            {Number(formData.discount || 0).toFixed(2)}
          </p>
        </div>

        {/* Tax */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Percent size={16} />

            <p className="text-xs font-medium">
              Tax
            </p>
          </div>

          <p className="mt-2 flex items-center gap-1 text-xl font-bold text-slate-900 dark:text-white">
            <IndianRupee size={17} />
            {Number(formData.tax || 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Grand Total */}
      <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 dark:border-blue-900/50 dark:bg-blue-950/20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Grand Total
            </p>

            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Final amount after discount and tax
            </p>
          </div>

          <p className="flex items-center gap-1 text-3xl font-bold text-slate-900 dark:text-white">
            <IndianRupee size={24} />
            {grandTotal.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
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
            inline-flex
            items-center
            justify-center
            gap-2
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
          <ReceiptText size={17} />

          {loading ? "Saving..." : "Save Sale"}
        </button>
      </div>
    </form>
  );
}