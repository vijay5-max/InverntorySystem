export default function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full border border-gray-200">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-3">ID</th>

            <th className="border p-3">Product</th>

            <th className="border p-3">Category</th>

            <th className="border p-3">SKU</th>

            <th className="border p-3">Purchase</th>

            <th className="border p-3">Selling</th>

            <th className="border p-3">Stock</th>

            <th className="border p-3">Status</th>

            <th className="border p-3">Actions</th>

          </tr>

        </thead>

        <tbody>

          {products.length === 0 ? (

            <tr>

              <td
                colSpan="9"
                className="text-center p-5"
              >
                No Products Found
              </td>

            </tr>

          ) : (

            products.map((product) => (

              <tr
                key={product.id}
                className="hover:bg-gray-50"
              >

                <td className="border p-3">
                  {product.id}
                </td>

                <td className="border p-3">
                  {product.product_name}
                </td>

                <td className="border p-3">
                  {product.category_name}
                </td>

                <td className="border p-3">
                  {product.sku}
                </td>

                <td className="border p-3">
                  ₹{Number(product.purchase_price).toFixed(2)}
                </td>

                <td className="border p-3">
                  ₹{Number(product.selling_price).toFixed(2)}
                </td>

                <td className="border p-3">

                  <span
                    className={
                      product.quantity <= 5
                        ? "text-red-600 font-bold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    {product.quantity}
                  </span>

                </td>

                <td className="border p-3">

                  <span
                    className={
                      product.status === "Active"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {product.status}
                  </span>

                </td>

                <td className="border p-3">

                  <div className="flex gap-2 justify-center">

                    <button
                      onClick={() => onEdit(product)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(product.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}