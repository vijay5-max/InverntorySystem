import { Pencil, Trash2 } from "lucide-react";

export default function CustomerTable({
  customers,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Loading customers...
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

      {/* Table Header */}
      <div className="border-b border-gray-200 px-6 py-4 dark:border-slate-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Customer List
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
          Manage your customers and customer information
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="min-w-[850px] w-full">

          {/* Header */}
          <thead className="bg-gray-50 dark:bg-slate-800/70">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                Email
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                Address
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

            {customers.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="px-6 py-12 text-center"
                >

                  <p className="font-medium text-gray-700 dark:text-slate-300">
                    No customers found
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    Add your first customer to get started.
                  </p>

                </td>

              </tr>

            ) : (

              customers.map((customer) => (

                <tr
                  key={customer.id}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/50"
                >

                  {/* Customer */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {customer.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <p className="font-medium text-gray-900 dark:text-white">
                        {customer.name}
                      </p>

                    </div>

                  </td>

                  {/* Phone */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                    {customer.phone || "-"}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                    {customer.email || "-"}
                  </td>

                  {/* Address */}
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                    {customer.address || "-"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        customer.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                      }`}
                    >

                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          customer.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        }`}
                      />

                      {customer.status}

                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(customer)}
                        title="Edit customer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-900 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                      >
                        <Pencil size={16} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(customer.id)}
                        title="Delete customer"
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