export default function RecentSales({ sales = [] }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold">
          Recent Sales
        </h2>

        <button className="text-blue-600 text-sm hover:underline">
          View All
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Invoice
              </th>

              <th className="text-left py-3">
                Customer
              </th>

              <th className="text-left py-3">
                Date
              </th>

              <th className="text-right py-3">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {sales.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500"
                >
                  No recent sales
                </td>

              </tr>

            ) : (

              sales.map((sale) => (

                <tr
                  key={sale.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-3">
                    {sale.invoice_no}
                  </td>

                  <td className="py-3">
                    {sale.customer_name}
                  </td>

                  <td className="py-3">
                    {new Date(
                      sale.sale_date
                    ).toLocaleDateString("en-IN")}
                  </td>

                  <td className="py-3 text-right font-semibold">
                    ₹
                    {Number(
                      sale.total_amount
                    ).toLocaleString("en-IN")}
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

