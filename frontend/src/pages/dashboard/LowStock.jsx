export default function LowStock({ products = [] }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">
          Low Stock Products
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Product
              </th>

              <th className="text-right py-3">
                Stock
              </th>

            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>

                <td
                  colSpan="2"
                  className="text-center py-6 text-gray-500"
                >
                  No low stock products
                </td>

              </tr>

            ) : (

              products.map((product) => (

                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-3">
                    {product.product_name}
                  </td>

                  <td className="py-3 text-right">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.quantity <= 2
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {product.quantity}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}