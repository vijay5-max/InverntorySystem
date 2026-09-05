export default function LowStock({ products = [] }) {
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
      <div className="px-6 py-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Low Stock Products
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Products that need your attention
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">

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
                Product
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Stock
              </th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="2"
                  className="
                    px-6
                    py-10
                    text-center
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  ✓ All products have sufficient stock
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const isCritical = product.quantity <= 2;

                return (
                  <tr
                    key={product.id}
                    className="
                      border-b
                      border-gray-100
                      transition
                      hover:bg-gray-50
                      dark:border-slate-800
                      dark:hover:bg-slate-800/50
                    "
                  >
                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">

                        <div
                          className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            text-sm
                            font-bold
                            ${
                              isCritical
                                ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                                : "bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400"
                            }
                          `}
                        >
                          !
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {product.product_name}
                          </p>

                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            Stock level
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`
                          inline-flex
                          min-w-[38px]
                          justify-center
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-bold
                          ${
                            isCritical
                              ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                              : "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                          }
                        `}
                      >
                        {product.quantity}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>

      {/* Footer */}
      {products.length > 0 && (
        <div className="border-t border-gray-100 px-6 py-3 dark:border-slate-800">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {products.length} product
            {products.length !== 1 ? "s" : ""} require
            {products.length === 1 ? "s" : ""} attention
          </p>
        </div>
      )}
    </div>
  );
}