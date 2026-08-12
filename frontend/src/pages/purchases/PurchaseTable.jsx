export default function PurchaseTable({
  purchases,
  onView,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full border border-gray-200">

        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Purchase No</th>
            <th className="border p-3">Supplier</th>
            <th className="border p-3">Purchase Date</th>
            <th className="border p-3">Total</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>

        <tbody>

          {purchases.length === 0 ? (

            <tr>
              <td
                colSpan="6"
                className="text-center p-5"
              >
                No Purchases Found
              </td>
            </tr>

          ) : (

            purchases.map((purchase) => (

              <tr
                key={purchase.id}
                className="hover:bg-gray-50"
              >

                <td className="border p-3">
                  {purchase.purchase_no}
                </td>

                <td className="border p-3">
                  {purchase.supplier_name}
                </td>

                <td className="border p-3">
                  {new Date(
                    purchase.purchase_date
                  ).toLocaleDateString()}
                </td>

                <td className="border p-3">
                  ₹{Number(purchase.total).toFixed(2)}
                </td>

                <td className="border p-3">

                  <span
                    className={
                      purchase.status === "Completed"
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {purchase.status}
                  </span>

                </td>

                <td className="border p-3">

                  <div className="flex gap-2 justify-center">

                    <button
                      onClick={() => onView(purchase)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>

                    <button
                      onClick={() => onDelete(purchase.id)}
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