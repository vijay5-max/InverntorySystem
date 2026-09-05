import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Package,
  ReceiptText,
  Users,
  IndianRupee,
  Printer,
  Search,
  RotateCcw,
  CalendarDays,
  Truck,
} from "lucide-react";

import reportService from "../../services/report.service";

export default function PurchaseReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);

      const response = await reportService.getPurchaseReport();

      console.log("Purchase Report:", response);

      setReport(response);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to load purchase report."
      );
    } finally {
      setLoading(false);
    }
  };

  const purchases = Array.isArray(report?.purchases)
    ? report.purchases
    : [];

  const filteredPurchases = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return purchases;
    }

    return purchases.filter((purchase) => {
      return (
        String(purchase.purchase_no || "")
          .toLowerCase()
          .includes(query) ||
        String(purchase.supplier_name || "")
          .toLowerCase()
          .includes(query)
      );
    });
  }, [purchases, search]);

  const totalPurchases = purchases.length;

  const uniqueSuppliers = new Set(
    purchases.map((purchase) => purchase.supplier_name)
  ).size;

  const grandTotal = Number(report?.grandTotal || 0);

  const averagePurchase =
    totalPurchases > 0
      ? grandTotal / totalPurchases
      : 0;

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleReset = () => {
    setSearch("");
  };

  if (loading) {
    return (
      <div className="min-h-full bg-slate-50 p-6 dark:bg-slate-950">
        <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Loading purchase report...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
              Purchase Report
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Monitor supplier purchases, spending and transaction history
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="
            inline-flex
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
          "
        >
          <Printer size={17} />
          Print Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Purchases */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Purchases
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {totalPurchases}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <ReceiptText size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Purchase transactions recorded
          </p>
        </div>

        {/* Total Spending */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Spending
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                ₹{formatCurrency(grandTotal)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <IndianRupee size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Total value of purchases
          </p>
        </div>

        {/* Average Purchase */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Average Purchase
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                ₹{formatCurrency(averagePurchase)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Package size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Average value per transaction
          </p>
        </div>

        {/* Suppliers */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Suppliers
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {uniqueSuppliers}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Users size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Suppliers included in this report
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <CalendarDays size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Purchase Transactions
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Search purchase number or supplier
              </p>
            </div>
          </div>

          <div className="flex w-full gap-3 lg:w-auto">
            <div className="relative w-full lg:w-80">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search purchase or supplier..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-slate-900
                  outline-none
                  transition
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
                "
              />
            </div>

            <button
              type="button"
              onClick={handleReset}
              title="Reset search"
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

        <div className="mt-5 flex flex-wrap gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <ReceiptText size={15} className="text-slate-500" />

              <span className="text-xs text-slate-500 dark:text-slate-400">
                Transactions
              </span>
            </div>

            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {filteredPurchases.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <Truck size={15} className="text-slate-500" />

              <span className="text-xs text-slate-500 dark:text-slate-400">
                Suppliers
              </span>
            </div>

            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {uniqueSuppliers}
            </p>
          </div>

          <div className="ml-auto self-center text-xs text-slate-500 dark:text-slate-400">
            Showing {filteredPurchases.length} of{" "}
            {purchases.length} purchases
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Purchase History
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Complete purchase transaction history
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Purchase No
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Supplier
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Date
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPurchases.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-5 py-14 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                        <ReceiptText size={21} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        No purchases found
                      </p>

                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Try a different search term.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPurchases.map((purchase) => (
                  <tr
                    key={purchase.id}
                    className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    {/* Purchase No */}
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {purchase.purchase_no || "-"}
                      </span>
                    </td>

                    {/* Supplier */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                          {(purchase.supplier_name || "S")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {purchase.supplier_name || "-"}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {formatDate(purchase.purchase_date)}
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        ₹{formatCurrency(purchase.total)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            {filteredPurchases.length > 0 && (
              <tfoot className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800">
                <tr>
                  <td
                    colSpan="3"
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