import { useMemo, useState } from "react";
import PurchaseItemRow from "./PurchaseItemRow";

export default function PurchaseForm({
  suppliers,
  products,
  onSubmit,
  onCancel,
  loading = false,
}) {

  const [formData, setFormData] = useState({
    supplier_id: "",
    purchase_date: new Date().toISOString().slice(0, 10),
    remarks: "",
    items: [
      {
        product_id: "",
        quantity: 1,
        purchase_price: 0,
      },
    ],
  });

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };

  const handleItemChange = (index, field, value) => {

    const updated = [...formData.items];

    updated[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      items: updated,
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
          purchase_price: 0,
        },
      ],
    }));

  };

  const removeItem = (index) => {

    if (formData.items.length === 1) return;

    const updated = [...formData.items];

    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      items: updated,
    }));

  };

  const grandTotal = useMemo(() => {

    return formData.items.reduce((sum, item) => {

      return (
        sum +
        Number(item.quantity || 0) *
        Number(item.purchase_price || 0)
      );

    }, 0);

  }, [formData.items]);

  const submit = (e) => {

    e.preventDefault();

    if (!formData.supplier_id) {
      alert("Please select a supplier.");
      return;
    }

    if (formData.items.length === 0) {
      alert("Please add at least one item.");
      return;
    }

    onSubmit({
      supplier_id: Number(formData.supplier_id),
      purchase_date: formData.purchase_date,
      remarks: formData.remarks,
      items: formData.items,
    });

  };

  return (

    <form onSubmit={submit}>

      <div className="grid grid-cols-2 gap-4 mb-6">

        <div>

          <label className="block mb-1">
            Supplier
          </label>

          <select
            name="supplier_id"
            value={formData.supplier_id}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          >

            <option value="">
              Select Supplier
            </option>

            {suppliers.map((supplier) => (

              <option
                key={supplier.id}
                value={supplier.id}
              >
                {supplier.supplier_name}
              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="block mb-1">
            Purchase Date
          </label>

          <input
            type="date"
            name="purchase_date"
            value={formData.purchase_date}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />

        </div>

      </div>

      <div className="mb-5">

        <label className="block mb-1">
          Remarks
        </label>

        <textarea
          rows={3}
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />

      </div>

      <table className="w-full border mb-4">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-2">Product</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Purchase Price</th>
            <th className="border p-2">Subtotal</th>
            <th className="border p-2">Action</th>

          </tr>

        </thead>

        <tbody>

          {formData.items.map((item, index) => (

            <PurchaseItemRow
              key={index}
              index={index}
              item={item}
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

      <div className="text-right text-xl font-bold mb-5">
        Grand Total : ₹{grandTotal.toFixed(2)}
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
          {loading ? "Saving..." : "Save Purchase"}
        </button>

      </div>

    </form>

  );

}