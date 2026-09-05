import { useNavigate } from "react-router-dom";

export default function RecentSales({ sales = [] }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        rounded-2xl
        border border-gray-200
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Recent Sales
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Latest transactions
          </p>
        </div>

        <button
          onClick={() => navigate("/sales")}
          className="
            text-sm
            font-medium
            text-blue-600
            hover:text-blue-700
            hover:underline
            dark:text-blue-400
          "
        >
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">

          <thead>
            <tr
              className="
                border-y
                border-gray-200
                bg-gray-50
                dark:border-slate-800
                dark:bg-slate-800/50
              "
            >
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Invoice
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Customer
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Date
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="
                    px-6
                    py-10
                    text-center
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  No recent sales
                </td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr
                  key={sale.id}
                  className="
                    border-b
                    border-gray-100
                    transition
                    hover:bg-gray-50
                    dark:border-slate-800
                    dark:hover:bg-slate-800/50
                  "
                >
                  {/* Invoice */}
                  <td className="px-6 py-4">
                    <span
                      className="
                        inline-flex
                        rounded-md
                        bg-blue-50
                        px-2.5
                        py-1
                        text-xs
                        font-semibold
                        text-blue-700
                        dark:bg-blue-950
                        dark:text-blue-400
                      "
                    >
                      {sale.invoice_no}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <p className="max-w-[180px] truncate text-sm font-medium text-gray-900 dark:text-white">
                      {sale.customer_name || "Walk-in Customer"}
                    </p>
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(
                      sale.sale_date
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Amount */}
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      ₹
                      {Number(
                        sale.total_amount
                      ).toLocaleString("en-IN")}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Footer */}
      {sales.length > 0 && (
        <div className="border-t border-gray-100 px-6 py-3 dark:border-slate-800">
          <button
            onClick={() => navigate("/sales")}
            className="
              text-sm
              font-medium
              text-gray-500
              transition
              hover:text-blue-600
              dark:text-gray-400
              dark:hover:text-blue-400
            "
          >
            View all sales →
          </button>
        </div>
      )}
    </div>
  );
}