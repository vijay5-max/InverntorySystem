import { Pencil, Trash2 } from "lucide-react";

export default function SupplierTable({
  suppliers,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

      {/* Table Header */}
      <div className="border-b border-gray-200 px-6 py-4 dark:border-slate-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Supplier List
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
          Manage your suppliers and supplier information
        </p>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">

        <table className="min-w-full">

          {/* Header */}
          <thead className="bg-gray-50 dark:bg-slate-800/70">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                ID
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                Supplier
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                Contact Person
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                Email
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                GST Number
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                Actions
              </th>

            </tr>

          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800">

            {suppliers.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="px-6 py-12 text-center"
                >

                  <div className="flex flex-col items-center">

                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800">

                      <span className="text-xl text-gray-400">
                        —
                      </span>

                    </div>

                    <p className="font-medium text-gray-700 dark:text-slate-300">
                      No suppliers found
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Add your first supplier to get started.
                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              suppliers.map((supplier) => (

                <tr
                  key={supplier.id}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/50"
                >

                  {/* ID */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500 dark:text-slate-400">
                    #{supplier.id}
                  </td>

                  {/* Supplier */}
                  <td className="whitespace-nowrap px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {supplier.supplier_name?.charAt(0)?.toUpperCase()}
                      </div>

                      <div>

                        <p className="font-medium text-gray-900 dark:text-white">
                          {supplier.supplier_name}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Contact */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                    {supplier.contact_person || "-"}
                  </td>

                  {/* Phone */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                    {supplier.phone || "-"}
                  </td>

                  {/* Email */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                    {supplier.email || "-"}
                  </td>

                  {/* GST */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                    {supplier.gst_number || "-"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        supplier.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                      }`}
                    >

                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          supplier.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        }`}
                      />

                      {supplier.status}

                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      {/* Edit */}
                      <button
                        onClick={() => onEdit(supplier)}
                        title="Edit supplier"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-900 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                      >
                        <Pencil size={16} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDelete(supplier.id)}
                        title="Delete supplier"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-red-900 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}