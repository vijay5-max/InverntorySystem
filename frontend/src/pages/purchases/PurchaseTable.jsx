import { Eye, Trash2, Search, ChevronDown, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";

export default function PurchaseTable({
  purchases = [],
  onView,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [supplierFilter, setSupplierFilter] = useState("All Suppliers");

  // ============================
  // Suppliers
  // ============================

  const suppliers = [
    ...new Set(
      purchases
        .map((purchase) => purchase.supplier_name)
        .filter(Boolean)
    ),
  ];

  // ============================
  // Filter Purchases
  // ============================

  const filteredPurchases = useMemo(() => {
    return purchases.filter((purchase) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        purchase.purchase_no
          ?.toLowerCase()
          .includes(searchText) ||
        purchase.supplier_name
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All Status" ||
        purchase.status === statusFilter;

      const matchesSupplier =
        supplierFilter === "All Suppliers" ||
        purchase.supplier_name === supplierFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSupplier
      );
    });
  }, [
    purchases,
    search,
    statusFilter,
    supplierFilter,
  ]);

  // ============================
  // Statistics
  // ============================

  const totalPurchases = purchases.length;

  const totalAmount = purchases.reduce(
    (sum, purchase) =>
      sum + Number(purchase.total_amount || 0),
    0
  );

  const averagePurchase =
    totalPurchases > 0
      ? totalAmount / totalPurchases
      : 0;

  const pendingPurchases = purchases.filter(
    (purchase) => purchase.status !== "Completed"
  ).length;

  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="space-y-6">

      {/* ========================= */}
      {/* Summary Cards */}
      {/* ========================= */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">

          {/* Total Purchases */}
          <div className="flex items-center gap-4 p-4 border-b xl:border-b-0 xl:border-r border-gray-200">

            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <ShoppingCart
                size={24}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Purchases
              </p>

              <h3 className="text-2xl font-bold text-gray-900">
                {totalPurchases}
              </h3>

              <p className="text-xs text-gray-400">
                This month
              </p>
            </div>

          </div>

          {/* Total Amount */}
          <div className="flex items-center gap-4 p-4 border-b xl:border-b-0 xl:border-r border-gray-200">

            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">

              <span className="text-2xl font-bold text-green-600">
                ₹
              </span>

            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Amount
              </p>

              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalAmount)}
              </h3>

              <p className="text-xs text-gray-400">
                This month
              </p>
            </div>

          </div>

          {/* Average */}
          <div className="flex items-center gap-4 p-4 border-b md:border-b-0 xl:border-r border-gray-200">

            <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center">

              <span className="text-xl">
                📦
              </span>

            </div>

            <div>
              <p className="text-sm text-gray-500">
                Average Purchase
              </p>

              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(averagePurchase)}
              </h3>

              <p className="text-xs text-gray-400">
                This month
              </p>
            </div>

          </div>

          {/* Pending */}
          <div className="flex items-center gap-4 p-4">

            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">

              <span className="text-xl">
                📋
              </span>

            </div>

            <div>
              <p className="text-sm text-gray-500">
                Pending Purchases
              </p>

              <h3 className="text-2xl font-bold text-gray-900">
                {pendingPurchases}
              </h3>

              <p className="text-xs text-gray-400">
                This month
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* Search + Filters + Table */}
      {/* ========================= */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

        {/* Filters */}

        <div className="flex flex-col lg:flex-row gap-3 mb-6">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by purchase no or supplier..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                h-12
                pl-11
                pr-4
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-900
                placeholder-gray-400
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-50
              "
            />

          </div>

          {/* Supplier */}

          <div className="relative">

            <select
              value={supplierFilter}
              onChange={(e) =>
                setSupplierFilter(e.target.value)
              }
              className="
                appearance-none
                w-full
                lg:w-52
                h-12
                px-4
                pr-10
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-700
                outline-none
                cursor-pointer
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-50
              "
            >

              <option>
                All Suppliers
              </option>

              {suppliers.map((supplier) => (
                <option
                  key={supplier}
                  value={supplier}
                >
                  {supplier}
                </option>
              ))}

            </select>

            <ChevronDown
              size={18}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
                pointer-events-none
              "
            />

          </div>

          {/* Status */}

          <div className="relative">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="
                appearance-none
                w-full
                lg:w-48
                h-12
                px-4
                pr-10
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-700
                outline-none
                cursor-pointer
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-50
              "
            >

              <option>
                All Status
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Pending">
                Pending
              </option>

            </select>

            <ChevronDown
              size={18}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
                pointer-events-none
              "
            />

          </div>

        </div>

        {/* ========================= */}
        {/* Table */}
        {/* ========================= */}

        <div className="overflow-x-auto rounded-xl border border-gray-200">

          <table className="w-full min-w-[850px]">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Purchase No
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Supplier
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Purchase Date
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Total
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredPurchases.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-12 text-gray-500"
                  >
                    No purchases found.
                  </td>

                </tr>

              ) : (

                filteredPurchases.map((purchase) => (

                  <tr
                    key={purchase.id}
                    className="
                      hover:bg-gray-50
                      transition-colors
                    "
                  >

                    {/* Purchase No */}

                    <td className="px-5 py-5">

                      <button
                        onClick={() =>
                          onView(purchase)
                        }
                        className="
                          font-medium
                          text-blue-600
                          hover:text-blue-800
                          hover:underline
                        "
                      >
                        {purchase.purchase_no}
                      </button>

                    </td>

                    {/* Supplier */}

                    <td className="px-5 py-5">

                      <div className="flex items-center gap-3">

                        <div className="
                          w-9
                          h-9
                          rounded-full
                          bg-purple-100
                          text-purple-700
                          flex
                          items-center
                          justify-center
                          font-semibold
                        ">
                          {purchase.supplier_name
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        <span className="font-medium text-gray-800">
                          {purchase.supplier_name}
                        </span>

                      </div>

                    </td>

                    {/* Date */}

                    <td className="px-5 py-5 text-gray-700">

                      {purchase.purchase_date
                        ? new Date(
                            purchase.purchase_date
                          ).toLocaleDateString("en-IN")
                        : "-"}

                    </td>

                    {/* Total */}

                    <td className="px-5 py-5">

                      <span className="font-semibold text-gray-900">
                        {formatCurrency(
                          purchase.total_amount
                        )}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-5 py-5">

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-1.5
                          rounded-lg
                          text-sm
                          font-medium
                          ${
                            purchase.status === "Completed"
                              ? "bg-green-50 text-green-700"
                              : "bg-yellow-50 text-yellow-700"
                          }
                        `}
                      >

                        <span className="w-2 h-2 rounded-full bg-current" />

                        {purchase.status}

                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-5 py-5">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            onView(purchase)
                          }
                          title="View purchase"
                          className="
                            w-10
                            h-10
                            rounded-lg
                            border
                            border-blue-200
                            text-blue-600
                            flex
                            items-center
                            justify-center
                            hover:bg-blue-50
                            transition
                          "
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() =>
                            onDelete(purchase.id)
                          }
                          title="Delete purchase"
                          className="
                            w-10
                            h-10
                            rounded-lg
                            border
                            border-red-200
                            text-red-600
                            flex
                            items-center
                            justify-center
                            hover:bg-red-50
                            transition
                          "
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* Results */}

        <div className="flex justify-between items-center mt-5 text-sm text-gray-500">

          <span>
            Showing {filteredPurchases.length} of{" "}
            {purchases.length} purchases
          </span>

        </div>

      </div>

    </div>
  );
}