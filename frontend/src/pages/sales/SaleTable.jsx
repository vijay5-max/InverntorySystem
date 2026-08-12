export default function SaleTable({
  sales,
  onView,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">

      <table className="min-w-full border border-gray-200">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-3">Invoice No</th>

            <th className="border p-3">Customer</th>

            <th className="border p-3">Sale Date</th>

            <th className="border p-3">Payment</th>

            <th className="border p-3">Discount</th>

            <th className="border p-3">Tax</th>

            <th className="border p-3">Total</th>

            <th className="border p-3">Actions</th>

          </tr>

        </thead>

        <tbody>

          {sales.length === 0 ? (

            <tr>

              <td
                colSpan="8"
                className="text-center p-6"
              >
                No Sales Found
              </td>

            </tr>

          ) : (

            sales.map((sale) => (

              <tr
                key={sale.id}
                className="hover:bg-gray-50"
              >

                <td className="border p-3">
                  {sale.invoice_no}
                </td>

                <td className="border p-3">
                  {sale.customer_name}
                </td>

                <td className="border p-3">
                  {new Date(
                    sale.sale_date
                  ).toLocaleDateString()}
                </td>

                <td className="border p-3">
                  {sale.payment_method}
                </td>

                <td className="border p-3">
                  ₹{Number(sale.discount).toFixed(2)}
                </td>

                <td className="border p-3">
                  ₹{Number(sale.tax).toFixed(2)}
                </td>

                <td className="border p-3 font-semibold">
                  ₹{Number(
                    sale.total_amount
                  ).toFixed(2)}
                </td>

                <td className="border p-3">

                  <div className="flex gap-2 justify-center">

                    <button
                      onClick={() => onView(sale)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        onDelete(sale.id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
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