import { useEffect, useState } from "react";
import {
  Building2,
  UserRound,
  Phone,
  Mail,
  FileText,
  MapPin,
  CircleCheck,
  X,
} from "lucide-react";

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
        status: initialData.status || "Active",
      });
    } else {
      setFormData({
        supplier_name: "",
        contact_person: "",
        phone: "",
        email: "",
        address: "",
        gst_number: "",
        status: "Active",
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

      <div className="relative z-[100000] flex max-h-[calc(100vh-6rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <Building2 size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEdit ? "Edit Supplier" : "Add Supplier"}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {isEdit
                  ? "Update supplier information"
                  : "Add a new supplier to your business"}
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
            <X size={19} />
          </button>

        </div>

        {/* Form area */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto p-6"
        >

          {/* Supplier Information */}
          <div className="mb-6">

            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Supplier Information
              </h3>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Basic details about the supplier
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Supplier Name */}
              <div className="md:col-span-2">

                <label className={labelClass}>
                  Supplier Name
                </label>

                <div className="relative">
                  <Building2
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="supplier_name"
                    value={formData.supplier_name}
                    onChange={handleChange}
                    placeholder="Enter supplier name"
                    className={`${inputClass} pl-11`}
                  />
                </div>

              </div>

              {/* Contact Person */}
              <div>

                <label className={labelClass}>
                  Contact Person
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={handleChange}
                    placeholder="Contact person"
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

              {/* GST */}
              <div>

                <label className={labelClass}>
                  GST Number
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="gst_number"
                    value={formData.gst_number}
                    onChange={handleChange}
                    placeholder="GST number"
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
                Supplier location and address details
              </p>
            </div>

            <div className="relative">

              <MapPin
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={4}
                placeholder="Enter supplier address"
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

          {/* Actions */}
          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">

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
                ? "Update Supplier"
                : "Save Supplier"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
