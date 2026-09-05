import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

export default function SaleTable({
  sales = [],
  onView,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All Payments");

  // ==============================
  // FILTER SALES
  // ==============================
  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        sale.invoice_no
          ?.toLowerCase()
          .includes(searchText) ||
        sale.customer_name
          ?.toLowerCase()
          .includes(searchText);

      const matchesPayment =
        paymentFilter === "All Payments" ||
        sale.payment_method === paymentFilter;

      return matchesSearch && matchesPayment;
    });
  }, [sales, search, paymentFilter]);

  // ==============================
  // FORMAT MONEY
  // ==============================
  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // ==============================
  // FORMAT DATE
  // ==============================
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN");
  };

  // ==============================
  // CUSTOMER INITIALS
  // ==============================
  const getInitials = (name) => {
    if (!name) return "?";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

      {/* ==============================
          FILTER AREA
      ============================== */}
      <div className="flex flex-col gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center">

        {/* Search */}
        <div className="relative flex-1">

          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by invoice no or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-xl
              border border-slate-200
              bg-white
              py-3
              pl-11
              pr-4
              text-sm
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />

        </div>

        {/* Payment Filter */}
        <div className="relative">

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="
              h-12
              w-full
              appearance-none
              rounded-xl
              border border-slate-200
              bg-white
              px-4
              pr-10
              text-sm
              text-slate-700
              outline-none
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              lg:w-48
            "
          >
            <option>All Payments</option>
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

        </div>

        {/* Date Button */}
        <button
          type="button"
          className="
            flex
            h-12
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            text-slate-500
            transition
            hover:bg-slate-50
          "
        >
          <CalendarDays size={18} />
          Select Date Range
        </button>

      </div>

      {/* ==============================
          SALES TABLE
      ============================== */}
      <div className="overflow-x-auto">

        <table className="min-w-[950px] w-full">

          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Invoice No
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sale Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Payment
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Discount
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tax
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Total
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {filteredSales.length === 0 ? (

              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-12 text-center text-sm text-slate-500"
                >
                  No sales found.
                </td>
              </tr>

            ) : (

              filteredSales.map((sale) => {

                const customerName =
                  sale.customer_name || "Walk-in Customer";

                const payment =
                  sale.payment_method || "Cash";

                return (
                  <tr
                    key={sale.id}
                    className="
                      border-b
                      border-slate-100
                      transition-colors
                      hover:bg-slate-50
                    "
                  >

                    {/* Invoice */}
                    <td className="px-6 py-5">

                      <button
                        type="button"
                        onClick={() => onView(sale)}
                        className="
                          font-medium
                          text-blue-600
                          hover:text-blue-700
                          hover:underline
                        "
                      >
                        {sale.invoice_no}
                      </button>

                    </td>

                    {/* Customer */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-purple-100
                            text-sm
                            font-semibold
                            text-purple-600
                          "
                        >
                          {getInitials(customerName)}
                        </div>

                        <span className="max-w-[180px] truncate text-sm font-medium text-slate-700">
                          {customerName}
                        </span>

                      </div>

                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">

                      <div className="flex items-center gap-2">

                        {formatDate(sale.sale_date)}

                        <CalendarDays
                          size={16}
                          className="text-slate-400"
                        />

                      </div>

                    </td>

                    {/* Payment */}
                    <td className="px-6 py-5">

                      <span
                        className={`
                          inline-flex
                          rounded-lg
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          ${
                            payment === "Cash"
                              ? "bg-emerald-50 text-emerald-600"
                              : payment === "Card"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-purple-50 text-purple-600"
                          }
                        `}
                      >
                        {payment}
                      </span>

                    </td>

                    {/* Discount */}
                    <td className="whitespace-nowrap px-6 py-5 text-right text-sm text-slate-600">
                      ₹{formatMoney(sale.discount)}
                    </td>

                    {/* Tax */}
                    <td className="whitespace-nowrap px-6 py-5 text-right text-sm text-slate-600">
                      ₹{formatMoney(sale.tax)}
                    </td>

                    {/* Total */}
                    <td className="whitespace-nowrap px-6 py-5 text-right text-sm font-bold text-slate-900">
                      ₹{formatMoney(sale.total_amount)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">

                      <div className="flex justify-center gap-2">

                        <button
                          type="button"
                          onClick={() => onView(sale)}
                          title="View sale"
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-blue-200
                            bg-white
                            text-blue-600
                            transition
                            hover:bg-blue-50
                          "
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(sale.id)}
                          title="Delete sale"
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-red-200
                            bg-white
                            text-red-500
                            transition
                            hover:bg-red-50
                          "
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })

            )}

          </tbody>

        </table>

      </div>

      {/* ==============================
          FOOTER
      ============================== */}
      <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">

        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-700">
            {filteredSales.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-700">
            {sales.length}
          </span>{" "}
          sales
        </p>

      </div>

    </div>
  );
}