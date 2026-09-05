import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Package,
  ReceiptText,
  Printer,
  Search,
  RotateCcw,
  CircleDollarSign,
} from "lucide-react";

import reportService from "../../services/report.service";

export default function ProfitReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);

      const data = await reportService.getProfitReport();

      console.log("Profit Report:", data);

      setReport(data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to load profit report."
      );
    } finally {
      setLoading(false);
    }
  };

  const profitData = Array.isArray(report?.profit)
    ? report.profit
    : [];

  const filteredProfit = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return profitData;
    }

    return profitData.filter((item) =>
      String(item.product_name || "")
        .toLowerCase()
        .includes(query)
    );
  }, [profitData, search]);

  const totalSales = Number(report?.totalSales || 0);
  const totalCost = Number(report?.totalCost || 0);
  const totalProfit = Number(report?.totalProfit || 0);

  const profitMargin =
    totalSales > 0
      ? (totalProfit / totalSales) * 100
      : 0;

  const totalSoldQuantity = profitData.reduce(
    (total, item) =>
      total + Number(item.sold_quantity || 0),
    0
  );

  const profitableProducts = profitData.filter(
    (item) => Number(item.profit || 0) > 0
  ).length;

  const lossProducts = profitData.filter(
    (item) => Number(item.profit || 0) < 0
  ).length;

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
              Loading profit report...
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
              Profit Report
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Analyze revenue, costs and profitability by product
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
        {/* Total Sales */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Sales
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                ₹{formatCurrency(totalSales)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <IndianRupee size={19} />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <TrendingUp size={14} />
            Total revenue generated
          </div>
        </div>

        {/* Total Cost */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Cost
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                ₹{formatCurrency(totalCost)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <CircleDollarSign size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Total product purchase cost
          </p>
        </div>

        {/* Total Profit */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Profit
              </p>

              <p
                className={`mt-2 text-2xl font-bold ${
                  totalProfit >= 0
                    ? "text-slate-900 dark:text-white"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                ₹{formatCurrency(totalProfit)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {totalProfit >= 0 ? (
                <TrendingUp size={19} />
              ) : (
                <TrendingDown size={19} />
              )}
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Net profit from sales
          </p>
        </div>

        {/* Profit Margin */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Profit Margin
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {profitMargin.toFixed(1)}%
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <BarChart3 size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Profit as a percentage of sales
          </p>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <Package size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Profitability Overview
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Summary of product performance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Units Sold
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {totalSoldQuantity.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Profitable Products
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {profitableProducts}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Loss Products
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {lossProducts}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <Search size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Product Profitability
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Search products to review sales and profit
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
                placeholder="Search product..."
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

        <div className="mt-5 text-xs text-slate-500 dark:text-slate-400">
          Showing {filteredProfit.length} of{" "}
          {profitData.length} products
        </div>
      </div>

      {/* Profit Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Profit Details
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Sales, cost and profit by product
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Product
                </th>

                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Sold Qty
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Sales
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Cost
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Profit
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredProfit.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-14 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                        <Package size={21} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        No profit data found
                      </p>

                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Try a different product name.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProfit.map((item) => {
                  const profit = Number(item.profit || 0);

                  return (
                    <tr
                      key={item.id}
                      className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      {/* Product */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                            <Package size={16} />
                          </div>

                          <span className="text-sm font-semibold text-slate-900 dark:text-white">
                            {item.product_name || "-"}
                          </span>
                        </div>
                      </td>

                      {/* Sold Quantity */}
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex min-w-10 justify-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {Number(
                            item.sold_quantity || 0
                          ).toLocaleString("en-IN")}
                        </span>
                      </td>

                      {/* Sales */}
                      <td className="px-5 py-4 text-right">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          ₹
                          {formatCurrency(
                            item.sales_amount
                          )}
                        </span>
                      </td>

                      {/* Cost */}
                      <td className="px-5 py-4 text-right">
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          ₹
                          {formatCurrency(
                            item.purchase_cost
                          )}
                        </span>
                      </td>

                      {/* Profit */}
                      <td className="px-5 py-4 text-right">
                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-lg
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            ${
                              profit >= 0
                                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                                : "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                            }
                          `}
                        >
                          {profit >= 0 ? (
                            <TrendingUp size={13} />
                          ) : (
                            <TrendingDown size={13} />
                          )}

                          ₹{formatCurrency(profit)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

            {filteredProfit.length > 0 && (
              <tfoot className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800">
                <tr>
                  <td
                    colSpan="2"
                    className="px-5 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-300"
                  >
                    Totals
                  </td>

                  <td className="px-5 py-4 text-right text-sm font-bold text-slate-900 dark:text-white">
                    ₹{formatCurrency(totalSales)}
                  </td>

                  <td className="px-5 py-4 text-right text-sm font-bold text-slate-900 dark:text-white">
                    ₹{formatCurrency(totalCost)}
                  </td>

                  <td className="px-5 py-4 text-right text-base font-bold text-slate-900 dark:text-white">
                    ₹{formatCurrency(totalProfit)}
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