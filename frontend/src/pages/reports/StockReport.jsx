import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Boxes,
  Package,
  Layers3,
  IndianRupee,
  Printer,
  Search,
  AlertTriangle,
  CircleCheck,
  CircleX,
} from "lucide-react";

import reportService from "../../services/report.service";

export default function StockReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);

      const data = await reportService.getStockReport();

      console.log("Stock Report:", data);

      setReport(data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to load stock report."
      );
    } finally {
      setLoading(false);
    }
  };

  const products = Array.isArray(report?.products)
    ? report.products
    : [];

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return products;
    }

    return products.filter((product) => {
      return (
        String(product.barcode || "")
          .toLowerCase()
          .includes(query) ||
        String(product.product_name || "")
          .toLowerCase()
          .includes(query) ||
        String(product.category_name || "")
          .toLowerCase()
          .includes(query) ||
        String(product.brand || "")
          .toLowerCase()
          .includes(query)
      );
    });
  }, [products, search]);

  const lowStockCount = products.filter(
    (product) =>
      Number(product.quantity || 0) > 0 &&
      Number(product.quantity || 0) <= 5
  ).length;

  const outOfStockCount = products.filter(
    (product) => Number(product.quantity || 0) <= 0
  ).length;

  const activeCount = products.filter(
    (product) => product.status === "Active"
  ).length;

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (loading) {
    return (
      <div className="min-h-full bg-slate-50 p-6 dark:bg-slate-950">
        <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Loading stock report...
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
              Stock Report
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Monitor inventory levels, stock value and product availability
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
        {/* Products */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Products
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {Number(report?.totalProducts || 0)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Package size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Products currently tracked
          </p>
        </div>

        {/* Stock Quantity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Stock Quantity
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {Number(report?.totalStock || 0).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Boxes size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Total units currently in stock
          </p>
        </div>

        {/* Stock Value */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Stock Value
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                ₹{formatCurrency(report?.stockValue)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <IndianRupee size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Current inventory purchase value
          </p>
        </div>

        {/* Low / Out */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Stock Alerts
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {lowStockCount + outOfStockCount}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <AlertTriangle size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            {lowStockCount} low stock · {outOfStockCount} out of stock
          </p>
        </div>
      </div>

      {/* Search / Summary */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Inventory Overview
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Search and review your current product stock
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search product, barcode, brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <CircleCheck size={15} className="text-slate-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Active
              </span>
            </div>

            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {activeCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} className="text-slate-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Low Stock
              </span>
            </div>

            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {lowStockCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <CircleX size={15} className="text-slate-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Out of Stock
              </span>
            </div>

            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {outOfStockCount}
            </p>
          </div>

          <div className="ml-auto self-center text-xs text-slate-500 dark:text-slate-400">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Product Stock
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Current inventory by product
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1050px] w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Barcode
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Product
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Category
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Brand
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Purchase
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Selling
                </th>

                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Qty
                </th>

                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-5 py-14 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                        <Package size={21} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        No products found
                      </p>

                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Try a different search term.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const quantity = Number(product.quantity || 0);

                  const isOutOfStock = quantity <= 0;
                  const isLowStock =
                    quantity > 0 && quantity <= 5;

                  return (
                    <tr
                      key={product.id}
                      className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      {/* Barcode */}
                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {product.barcode || "-"}
                        </span>
                      </td>

                      {/* Product */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {product.product_name || "-"}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                            ID: {product.id}
                          </p>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {product.category_name || "-"}
                      </td>

                      {/* Brand */}
                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {product.brand || "-"}
                      </td>

                      {/* Purchase */}
                      <td className="px-5 py-4 text-right">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          ₹{formatCurrency(product.purchase_price)}
                        </span>
                      </td>

                      {/* Selling */}
                      <td className="px-5 py-4 text-right">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          ₹{formatCurrency(product.selling_price)}
                        </span>
                      </td>

                      {/* Qty */}
                      <td className="px-5 py-4 text-center">
                        <span
                          className={`
                            inline-flex
                            min-w-10
                            justify-center
                            rounded-lg
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            ${
                              isOutOfStock
                                ? "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                                : isLowStock
                                ? "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                            }
                          `}
                        >
                          {quantity}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 text-center">
                        <div className="flex flex-col items-center gap-1.5">
                          <span
                            className={`
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-lg
                              px-3
                              py-1.5
                              text-xs
                              font-semibold
                              ${
                                product.status === "Active"
                                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                              }
                            `}
                          >
                            {product.status === "Active" ? (
                              <CircleCheck size={13} />
                            ) : (
                              <CircleX size={13} />
                            )}

                            {product.status || "Unknown"}
                          </span>

                          {isOutOfStock && (
                            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                              Out of stock
                            </span>
                          )}

                          {isLowStock && (
                            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                              Low stock
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

            {filteredProducts.length > 0 && (
              <tfoot className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800">
                <tr>
                  <td
                    colSpan="4"
                    className="px-5 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-300"
                  >
                    Total Stock Value
                  </td>

                  <td
                    colSpan="4"
                    className="px-5 py-4 text-right text-base font-bold text-slate-900 dark:text-white"
                  >
                    ₹{formatCurrency(report?.stockValue)}
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