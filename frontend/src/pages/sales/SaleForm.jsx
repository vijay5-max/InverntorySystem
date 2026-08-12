import { useMemo, useState } from "react";
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
        Number(product.selling_price) *
          Number(item.quantity)
      );
    }, 0);
  }, [formData.items, products]);

  const grandTotal =
    subTotal -
    Number(formData.discount) +
    Number(formData.tax);

  const submit = (e) => {
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

  return (
    <form onSubmit={submit}>

      <div className="grid grid-cols-2 gap-4 mb-5">

        <div>
          <label className="block mb-1">
            Customer
          </label>

          <select
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            className="border rounded p-2 w-full"
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

        <div>
          <label className="block mb-1">
            Sale Date
          </label>

          <input
            type="date"
            name="sale_date"
            value={formData.sale_date}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>

      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">

        <div>

          <label className="block mb-1">
            Payment Method
          </label>

          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Bank Transfer</option>
          </select>

        </div>

        <div>

          <label className="block mb-1">
            Discount
          </label>

          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />

        </div>

        <div>

          <label className="block mb-1">
            Tax
          </label>

          <input
            type="number"
            name="tax"
            value={formData.tax}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />

        </div>

      </div>

      <table className="w-full border mb-4">

        <thead className="bg-gray-100">

          <tr>
            <th className="border p-2">
              Product
            </th>

            <th className="border p-2">
              Price
            </th>

            <th className="border p-2">
              Stock
            </th>

            <th className="border p-2">
              Qty
            </th>

            <th className="border p-2">
              Subtotal
            </th>

            <th className="border p-2">
              Action
            </th>
          </tr>

        </thead>

        <tbody>

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

      <button
        type="button"
        onClick={addItem}
        className="bg-green-600 text-white px-4 py-2 rounded mb-5"
      >
        + Add Product
      </button>

      <div className="text-right space-y-2 mb-5">

        <div>
          <strong>
            Subtotal :
          </strong>{" "}
          ₹{subTotal.toFixed(2)}
        </div>

        <div>
          Discount : ₹{Number(formData.discount).toFixed(2)}
        </div>

        <div>
          Tax : ₹{Number(formData.tax).toFixed(2)}
        </div>

        <div className="text-2xl font-bold">
          Total : ₹{grandTotal.toFixed(2)}
        </div>

      </div>

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-5 py-2 rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          {loading ? "Saving..." : "Save Sale"}
        </button>

      </div>

    </form>
  );
}