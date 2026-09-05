import { useEffect, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  Search,
  RotateCcw,
  ReceiptText,
  Users,
  CreditCard,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

import reportService from "../../services/report.service";

export default function SalesReport() {
  const [sales, setSales] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
  });

  const loadReport = async () => {
    try {
      setLoading(true);

      const response = await reportService.getSalesReport(filters);

      console.log("Sales Report:", response);

      setSales(response?.sales || []);
      setGrandTotal(response?.grandTotal || 0);
    } catch (error) {
      console.error("Sales Report Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load sales report."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  const handleFilter = () => {
    loadReport();
  };

  const handleReset = () => {
    setFilters({
      from: "",
      to: "",
    });

    setTimeout(() => {
      loadReport();
    }, 0);
  };

  const totalOrders = Array.isArray(sales)
    ? sales.length
    : 0;

  const averageSale =
    totalOrders > 0
      ? Number(grandTotal) / totalOrders
      : 0;

  const uniqueCustomers = new Set(
    Array.isArray(sales)
      ? sales.map((sale) => sale.customer_name)
      : []
  ).size;

  const paymentMethods = {};

  if (Array.isArray(sales)) {
    sales.forEach((sale) => {
      const method = sale.payment_method || "Unknown";

      paymentMethods[method] =
        (paymentMethods[method] || 0) + 1;
    });
  }

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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
    <div className="min-h-full bg-slate-50 p-6 dark:bg-slate-950">
      {/* Header */}
      <div className="mb-7 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <BarChart3 size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Sales Report
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Analyze your sales transactions and revenue
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Sales */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Sales
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                ₹{formatCurrency(grandTotal)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <IndianRupee size={19} />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <TrendingUp size={14} />
            Total revenue from filtered sales
          </div>
        </div>

        {/* Orders */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Orders
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {totalOrders}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <ReceiptText size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Number of sales transactions
          </p>
        </div>

        {/* Average Sale */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Average Sale
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                ₹{formatCurrency(averageSale)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <BarChart3 size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Average value per transaction
          </p>
        </div>

        {/* Customers */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Customers
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {uniqueCustomers}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Users size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Unique customers in results
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <CalendarDays size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Report Filters
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Select a date range to filter sales
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* From */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              From Date
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="date"
                value={filters.from}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    from: e.target.value,
                  })
                }
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          {/* To */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              To Date
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="date"
                value={filters.to}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    to: e.target.value,
                  })
                }
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-end gap-3">
            <button
              type="button"
              onClick={handleFilter}
              disabled={loading}
              className="
                inline-flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
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
              <Search size={17} />
              {loading ? "Loading..." : "Generate Report"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              title="Reset filters"
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-3
                text-slate-500
                transition
                hover:bg-slate-50
                hover:text-slate-700
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-400
                dark:hover:bg-slate-700
                dark:hover:text-slate-200
              "
            >
              <RotateCcw size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <CreditCard size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Payment Methods
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Transactions by payment type
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {Object.keys(paymentMethods).length > 0 ? (
            Object.entries(paymentMethods).map(
              ([method, count]) => (
                <div
                  key={method}
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    dark:border-slate-700
                    dark:bg-slate-800
                  "
                >
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {method}
                  </div>

                  <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {count}
                  </div>
                </div>
              )
            )
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No payment data available.
            </p>
          )}
        </div>
      </div>

      {/* Sales Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Sales Transactions
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {totalOrders} transaction
              {totalOrders !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Total: ₹{formatCurrency(grandTotal)}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[850px] w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Invoice
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Customer
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Payment
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Total
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-12 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />

                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Loading sales report...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : !Array.isArray(sales) || sales.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-14 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                        <ReceiptText size={21} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        No sales found
                      </p>

                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Try another date range.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                sales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    {/* Invoice */}
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {sale.invoice_no || "-"}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                          {(sale.customer_name || "C")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {sale.customer_name || "-"}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {formatDate(sale.sale_date)}
                    </td>

                    {/* Payment */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <CreditCard size={13} />
                        {sale.payment_method || "-"}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        ₹{formatCurrency(sale.total_amount)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            {!loading &&
              Array.isArray(sales) &&
              sales.length > 0 && (
                <tfoot className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800">
                  <tr>
                    <td
                      colSpan="4"
                      className="px-5 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-300"
                    >
                      Grand Total
                    </td>

                    <td className="px-5 py-4 text-right text-base font-bold text-slate-900 dark:text-white">
                      ₹{formatCurrency(grandTotal)}
                    </td>
                  </tr>
                </tfoot>
              )}
          </table>
        </div>
      </div>
    </div>
  );
}