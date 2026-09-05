import { useEffect, useState } from "react";
import {
  ShoppingCart,
  CalendarDays,
  FileText,
  X,
  Plus,
  Trash2,
  Package,
} from "lucide-react";

export default function PurchaseForm({
  suppliers = [],
  products = [],
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [supplierId, setSupplierId] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [remarks, setRemarks] = useState("");

  const [items, setItems] = useState([
    {
      product_id: "",
      quantity: 1,
      purchase_price: 0,
    },
  ]);

  useEffect(() => {
    if (products.length > 0 && items.length === 1 && !items[0].product_id) {
      // Keep first row empty until user selects a product.
    }
  }, [products, items]);

  const handleItemChange = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const handleProductChange = (index, productId) => {
    const product = products.find(
      (p) => String(p.id) === String(productId)
    );

    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              product_id: productId,
              purchase_price: product
                ? Number(product.purchase_price || 0)
                : 0,
            }
          : item
      )
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        product_id: "",
        quantity: 1,
        purchase_price: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return;

    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const totalAmount = items.reduce((total, item) => {
    const quantity = Number(item.quantity || 0);
    const price = Number(item.purchase_price || 0);

    return total + quantity * price;
  }, 0);

  const totalItems = items.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supplierId) {
      alert("Please select a supplier.");
      return;
    }

    const validItems = items.filter(
      (item) =>
        item.product_id &&
        Number(item.quantity) > 0 &&
        Number(item.purchase_price) >= 0
    );

    if (validItems.length === 0) {
      alert("Please add at least one valid product.");
      return;
    }

    const purchaseData = {
      supplier_id: Number(supplierId),
      purchase_date: purchaseDate,
      remarks: remarks.trim(),
      items: validItems.map((item) => ({
        product_id: Number(item.product_id),
        quantity: Number(item.quantity),
        purchase_price: Number(item.purchase_price),
      })),
    };

    await onSubmit(purchaseData);
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
    transition
    focus:border-blue-500
    focus:bg-white
    focus:ring-4
    focus:ring-blue-500/10
    dark:border-slate-700
    dark:bg-slate-800
    dark:text-white
    dark:focus:border-blue-500
    dark:focus:bg-slate-800
  `;

  return (
    <div
      className="
        fixed
        inset-0
        z-[999999]
        flex
        items-start
        justify-center
        overflow-y-auto
        bg-slate-950/60
        px-4
        pt-24
        pb-6
        backdrop-blur-sm
      "
    >
      <div
        className="
          flex
          max-h-[calc(100vh-6rem)]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <ShoppingCart size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                New Purchase
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Add products purchased from a supplier
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

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto p-6"
        >
          {/* Purchase Information */}
          <div className="mb-7">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Purchase Information
              </h3>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Select the supplier and purchase date
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Supplier */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Supplier
                </label>

                <div className="relative">
                  <Package
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={supplierId}
                    onChange={(e) => setSupplierId(e.target.value)}
                    required
                    className={`${inputClass} appearance-none pl-11`}
                  >
                    <option value="">Select supplier</option>

                    {suppliers.map((supplier) => (
                      <option
                        key={supplier.id}
                        value={supplier.id}
                      >
                        {supplier.supplier_name ||
                          supplier.name ||
                          supplier.company_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Purchase Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Purchase Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    value={purchaseDate}
                    onChange={(e) =>
                      setPurchaseDate(e.target.value)
                    }
                    required
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Items */}
          <div className="mb-7">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Purchase Items
                </h3>

                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  Add the products purchased from the supplier
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
              <table className="min-w-[850px] w-full">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Product
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Quantity
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Purchase Price
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Subtotal
                    </th>

                    <th className="w-16 px-4 py-3"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {items.map((item, index) => {
                    const subtotal =
                      Number(item.quantity || 0) *
                      Number(item.purchase_price || 0);

                    return (
                      <tr key={index}>
                        {/* Product */}
                        <td className="px-4 py-3">
                          <select
                            value={item.product_id}
                            onChange={(e) =>
                              handleProductChange(
                                index,
                                e.target.value
                              )
                            }
                            required
                            className={inputClass}
                          >
                            <option value="">
                              Select product
                            </option>

                            {products.map((product) => (
                              <option
                                key={product.id}
                                value={product.id}
                              >
                                {product.product_name ||
                                  product.name}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Quantity */}
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                            required
                            className={inputClass}
                          />
                        </td>

                        {/* Purchase Price */}
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.purchase_price}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "purchase_price",
                                e.target.value
                              )
                            }
                            required
                            className={inputClass}
                          />
                        </td>

                        {/* Subtotal */}
                        <td className="px-4 py-3 text-right">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            ₹{subtotal.toFixed(2)}
                          </span>
                        </td>

                        {/* Delete */}
                        <td className="px-4 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            disabled={items.length === 1}
                            title="Remove product"
                            className="
                              rounded-lg
                              p-2
                              text-slate-400
                              transition
                              hover:bg-red-50
                              hover:text-red-600
                              disabled:cursor-not-allowed
                              disabled:opacity-30
                              dark:hover:bg-red-950/30
                            "
                          >
                            <Trash2 size={17} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Remarks */}
          <div className="mb-7">
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Remarks
            </label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add purchase remarks..."
                className={`${inputClass} resize-none pl-11`}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Total Items
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {totalItems}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Grand Total
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                ₹{totalAmount.toFixed(2)}
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
              {loading ? "Saving..." : "Save Purchase"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}