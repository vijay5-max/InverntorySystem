import { Pencil, Trash2 } from "lucide-react";

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">

          {/* Table Header */}
          <thead>
            <tr
              className="
                border-b
                border-gray-200
                bg-gray-50
                dark:border-slate-800
                dark:bg-slate-800/60
              "
            >
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                ID
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Category Name
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="
                    px-6
                    py-12
                    text-center
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="
                    border-b
                    border-gray-100
                    transition
                    hover:bg-gray-50
                    dark:border-slate-800
                    dark:hover:bg-slate-800/50
                  "
                >
                  {/* ID */}
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    #{category.id}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {category.category_name}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${
                          category.status === "Active"
                            ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                            : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                        }
                      `}
                    >
                      <span
                        className={`
                          h-1.5
                          w-1.5
                          rounded-full
                          ${
                            category.status === "Active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }
                        `}
                      />

                      {category.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">

                      {/* Edit */}
                      <button
                        onClick={() => onEdit(category)}
                        title="Edit category"
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          text-gray-600
                          transition
                          hover:border-blue-200
                          hover:bg-blue-50
                          hover:text-blue-600
                          dark:border-slate-700
                          dark:bg-slate-800
                          dark:text-gray-400
                          dark:hover:bg-blue-950
                          dark:hover:text-blue-400
                        "
                      >
                        <Pencil size={16} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDelete(category.id)}
                        title="Delete category"
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          text-gray-600
                          transition
                          hover:border-red-200
                          hover:bg-red-50
                          hover:text-red-600
                          dark:border-slate-700
                          dark:bg-slate-800
                          dark:text-gray-400
                          dark:hover:bg-red-950
                          dark:hover:text-red-400
                        "
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

      {/* Footer */}
      {categories.length > 0 && (
        <div
          className="
            border-t
            border-gray-100
            px-6
            py-3
            dark:border-slate-800
          "
        >
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {categories.length} categor
            {categories.length === 1 ? "y" : "ies"} total
          </p>
        </div>
      )}
    </div>
  );
}