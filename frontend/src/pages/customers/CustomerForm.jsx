import { useEffect, useState } from "react";
import customerService from "../../services/customer.service";

export default function CustomerForm({
  customer,
  onClose,
}) {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    status: "Active",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {

    if (customer) {

      setFormData({
        name: customer.name || "",
        phone: customer.phone || "",
        email: customer.email || "",
        address: customer.address || "",
        status: customer.status || "Active",
      });

    }

  }, [customer]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      if (customer) {

        await customerService.updateCustomer(
          customer.id,
          formData
        );

      } else {

        await customerService.createCustomer(
          formData
        );

      }

      onClose();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to save customer."
      );

    } finally {

      setSaving(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">

        <h2 className="text-2xl font-bold mb-6">

          {customer
            ? "Edit Customer"
            : "Add Customer"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label className="block mb-2">
              Customer Name
            </label>

            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />

          </div>

          <div>

            <label className="block mb-2">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />

          </div>

          <div>

            <label className="block mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />

          </div>

          <div>

            <label className="block mb-2">
              Address
            </label>

            <textarea
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />

          </div>

          <div>

            <label className="block mb-2">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded p-2"
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
              onClick={onClose}
              className="px-5 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {saving
                ? "Saving..."
                : customer
                ? "Update Customer"
                : "Save Customer"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}