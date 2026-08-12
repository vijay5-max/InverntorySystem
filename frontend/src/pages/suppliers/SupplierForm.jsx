import { useEffect, useState } from "react";

export default function SupplierForm({
  initialData = null,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    supplier_name: "",
    contact_person: "",
    phone: "",
    email: "",
    address: "",
    gst_number: "",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        supplier_name: initialData.supplier_name || "",
        contact_person: initialData.contact_person || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        address: initialData.address || "",
        gst_number: initialData.gst_number || "",

      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.supplier_name.trim()) {
      alert("Supplier name is required");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Phone is required");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Supplier Name
        </label>
        <input
          type="text"
          name="supplier_name"
          value={formData.supplier_name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact Person
        </label>
        <input
          type="text"
          name="contact_person"
          value={formData.contact_person}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          GST Number
        </label>
        <input
          type="text"
          name="gst_number"
          value={formData.gst_number}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />
      </div>

      <div>
        <label className="Block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>

        <select 
          name="status"
          value={formData.status || "Active"}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
      </div>

      <div className="col-span-2 flex justify-end gap-2">
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
          {loading ? "Saving..." : "Save Supplier"}
        </button>
      </div>
    </form>
  );
}