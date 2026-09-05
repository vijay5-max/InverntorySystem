import {
  Pencil,
  Trash2,
  Package,
  Barcode,
  ShoppingBag,
} from "lucide-react";

export default function ProductTable({
  products = [],
  onEdit,
  onDelete,
}) {
  
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Catalogue Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <ShoppingBag size={19} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Product Catalogue
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Browse your products and inventory
            </p>
          </div>
        </div>

        <div className="text-sm text-slate-500 dark:text-slate-400">
          {products.length} product
          {products.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Catalogue */}
      {products.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm dark:bg-slate-900">
            <Package size={25} />
          </div>

          <p className="mt-4 font-semibold text-slate-700 dark:text-slate-300">
            No products found
          </p>

          <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
            Add your first product to build your catalogue.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const quantity = Number(product.quantity || 0);
            
            const lowStock = quantity > 0 && quantity <= 5;

            const outOfStock = quantity <= 0;
            
            const image = product.image || null;

            return (
              <div
                key={product.id}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:shadow-lg
                  dark:border-slate-700
                  dark:bg-slate-900
                "
              >
                {/* Product Image */}
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {image ? (
                    <img
                      src={image}
                      alt={product.product_name}
                      className="
                        h-full
                        w-full
                        object-contain
                        p-5
                        transition
                        duration-300
                        group-hover:scale-105
                      "
                      onError={() =>
                        console.error(
                          "Product image feild to load:",
                          image
                        )
                      }
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Package
                        size={60}
                        strokeWidth={1.2}
                        className="text-slate-300 dark:text-slate-600"
                      />
                    </div>
                  )}

                  {/* Status */}
                  <div className="absolute right-3 top-3">
                    <span
                      className={`
                        inline-flex
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${
                          product.status === "Active"
                            ? "bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400"
                            : "bg-white text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-400"
                        }
                      `}
                    >
                      {product.status || "Unknown"}
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  {/* Category */}
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    {product.category_name || "Product"}
                  </p>

                  {/* Name */}
                  <h3 className="mt-1 line-clamp-2 text-base font-bold text-slate-900 dark:text-white">
                    {product.product_name}
                  </h3>

                  {/* Brand */}
                  {product.brand && (
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {product.brand}
                    </p>
                  )}

                  {/* Price */}
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        Selling Price
                      </p>

                      <p className="mt-0.5 text-xl font-bold text-slate-900 dark:text-white">
                        ₹
                        {Number(
                          product.selling_price || 0
                        ).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    {/* Stock */}
                    <div className="text-right">
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        Stock
                      </p>

                      <span
                        className={`
                          mt-0.5 inline-flex rounded-lg px-2.5 py-1 text-xs font-bold
                          ${
                            outOfStock
                              ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                              : lowStock
                              ? "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          }
                        `}
                      >
                        {quantity}
                      </span>
                    </div>
                  </div>

                  {/* SKU / Barcode */}
                  <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                    {product.sku && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          SKU
                        </span>

                        <span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-300">
                          {product.sku}
                        </span>
                      </div>
                    )}

                    {product.barcode && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                          <Barcode size={13} />
                          Barcode
                        </span>

                        <span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-300">
                          {product.barcode}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      className="
                        flex
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-3
                        py-2.5
                        text-xs
                        font-semibold
                        text-slate-700
                        transition
                        hover:bg-slate-50
                        dark:border-slate-700
                        dark:bg-slate-800
                        dark:text-slate-200
                        dark:hover:bg-slate-700
                      "
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(product.id)
                      }
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-3
                        py-2.5
                        text-xs
                        font-semibold
                        text-red-600
                        transition
                        hover:bg-red-100
                        dark:border-red-900/50
                        dark:bg-red-950/20
                        dark:text-red-400
                        dark:hover:bg-red-950/40
                      "
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}