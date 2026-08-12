export default function SupplierTable({
  suppliers,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">

      <table className="min-w-full border border-gray-200">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-3">ID</th>

            <th className="border p-3">Supplier</th>

            <th className="border p-3">Contact Person</th>

            <th className="border p-3">Phone</th>

            <th className="border p-3">Email</th>

            <th className="border p-3">GST Number</th>

            <th className="border p-3">Status</th>

            <th className="border p-3">Actions</th>

          </tr>

        </thead>

        <tbody>

          {suppliers.length === 0 ? (

            <tr>

              <td
                colSpan="8"
                className="text-center p-5"
              >
                No Suppliers Found
              </td>

            </tr>

          ) : (

            suppliers.map((supplier) => (

              <tr
                key={supplier.id}
                className="hover:bg-gray-50"
              >

                <td className="border p-3">
                  {supplier.id}
                </td>

                <td className="border p-3">
                  {supplier.supplier_name}
                </td>

                <td className="border p-3">
                  {supplier.contact_person}
                </td>

                <td className="border p-3">
                  {supplier.phone}
                </td>

                <td className="border p-3">
                  {supplier.email}
                </td>

                <td className="border p-3">
                  {supplier.gst_number || "-"}
                </td>

                <td className="border p-3">

                  <span
                    className={
                      supplier.status === "Active"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {supplier.status}
                  </span>

                </td>

                <td className="border p-3">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(supplier)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(supplier.id)}
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