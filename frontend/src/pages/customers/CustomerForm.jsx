import { useEffect, useState } from "react";
import {
  UserRound,
  Phone,
  Mail,
  MapPin,
  CircleCheck,
  X,
} from "lucide-react";

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
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        status: "Active",
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    <div className="fixed inset-0 z-[99999] flex items-start justify-center overflow-y-auto bg-slate-950/50 px-4 pt-24 pb-6 backdrop-blur-sm">

      <div className="flex max-h-[calc(100vh-6rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <UserRound size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {customer
                  ? "Edit Customer"
                  : "Add Customer"}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {customer
                  ? "Update customer information"
                  : "Add a new customer to your business"}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
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
            <X size={19} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto p-6"
        >

          {/* Customer Information */}
          <div className="mb-6">

            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Customer Information
              </h3>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Basic details about the customer
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Name */}
              <div className="md:col-span-2">

                <label className={labelClass}>
                  Customer Name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter customer name"
                    autoFocus
                    className={`${inputClass} pl-11`}
                  />
                </div>

              </div>

              {/* Phone */}
              <div>

                <label className={labelClass}>
                  Phone
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className={`${inputClass} pl-11`}
                  />
                </div>

              </div>

              {/* Email */}
              <div>

                <label className={labelClass}>
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`${inputClass} pl-11`}
                  />
                </div>

              </div>

            </div>

          </div>

          {/* Address */}
          <div className="mb-6">

            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Address
              </h3>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Customer location and address details
              </p>
            </div>

            <div className="relative">

              <MapPin
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <textarea
                name="address"
                rows={4}
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter customer address"
                className={`${inputClass} resize-none pl-11`}
              />

            </div>

          </div>

          {/* Status */}
          <div className="mb-6">

            <label className={labelClass}>
              Status
            </label>

            <div className="relative">

              <CircleCheck
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`${inputClass} appearance-none pl-11`}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

            </div>

          </div>

          {/* Footer */}
          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">

            <button
              type="button"
              onClick={onClose}
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
              disabled={saving}
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