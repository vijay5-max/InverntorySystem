export default function CustomerTable({
  customers,
  loading,
  onEdit,
  onDelete,
}) {

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        Loading customers...
      </div>
    );
  }

  return (

    <div className="bg-white rounded-lg shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-3 text-left">
              Name
            </th>

            <th className="border p-3 text-left">
              Phone
            </th>

            <th className="border p-3 text-left">
              Email
            </th>

            <th className="border p-3 text-left">
              Address
            </th>

            <th className="border p-3 text-center">
              Status
            </th>

            <th className="border p-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {customers.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="text-center p-8 text-gray-500"
              >
                No customers found.
              </td>

            </tr>

          ) : (

            customers.map((customer) => (

              <tr
                key={customer.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-3">
                  {customer.name}
                </td>

                <td className="p-3">
                  {customer.phone}
                </td>

                <td className="p-3">
                  {customer.email || "-"}
                </td>

                <td className="p-3">
                  {customer.address || "-"}
                </td>

                <td className="p-3 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>

                </td>

                <td className="p-3">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(customer)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(customer.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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