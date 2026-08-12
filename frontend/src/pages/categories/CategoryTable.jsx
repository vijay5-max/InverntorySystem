const CategoryTable = ({
  categories,
  onEdit,
  onDelete,
}) => {

  return (

    <div className="overflow-x-auto">

      <table className="min-w-full border border-gray-200">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-3 text-left">
              ID
            </th>

            <th className="border p-3 text-left">
              Category Name
            </th>

            <th className="border p-3 text-left">
              Status
            </th>

            <th className="border p-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {categories.length === 0 ? (

            <tr>

              <td
                colSpan="4"
                className="text-center p-5"
              >
                No Categories Found
              </td>

            </tr>

          ) : (

            categories.map((category) => (

              <tr
                key={category.id}
                className="hover:bg-gray-50"
              >

                <td className="border p-3">
                  {category.id}
                </td>

                <td className="border p-3">
                  {category.category_name}
                </td>

                <td className="border p-3">

                  <span
                    className={
                      category.status === "Active"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {category.status}
                  </span>

                </td>

                <td className="border p-3 text-center">

                  <button
                    onClick={() => onEdit(category)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(category.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

};

export default CategoryTable;