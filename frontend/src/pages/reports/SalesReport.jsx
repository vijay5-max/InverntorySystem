import { useEffect, useState } from "react";
import reportService from "../../services/report.service";

export default function SalesReport() {
  const [sales, setSales] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
  });

  const loadReport = async () => {
    try {
      setLoading(true);

      const response = await reportService.getSalesReport(filters);

      console.log("Sales Report:", response);

      setSales(response?.sales || []);
      setGrandTotal(response?.grandTotal || 0);

    } catch (error) {
      console.error("Sales Report Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load sales report."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  const handleFilter = () => {
    loadReport();
  };

  console.log("sales =", sales);
  console.log("Is Array?", Array.isArray(sales));

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Sales Report
      </h1>

      {/* Filters */}

      <div className="bg-white rounded-lg shadow p-5 mb-6">

        <div className="grid md:grid-cols-3 gap-4">

          <div>
            <label className="block mb-2">
              From
            </label>

            <input
              type="date"
              value={filters.from}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  from: e.target.value,
                })
              }
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block mb-2">
              To
            </label>

            <input
              type="date"
              value={filters.to}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  to: e.target.value,
                })
              }
              className="border rounded w-full p-2"
            />
          </div>

          <div className="flex items-end">

            <button
              onClick={handleFilter}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Search
            </button>

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-lg shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-right">Total</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center p-6"
                >
                  Loading...
                </td>

              </tr>

            ) : !Array.isArray(sales) || sales.length === 0 ? (
              <tr>

                <td
                  colSpan="5"
                  className="text-center p-6"
                >
                  No sales found.
                </td>

              </tr>

            ) : (

              (sales || []).map((sale) => (

                <tr
                  key={sale.id}
                  className="border-t"
                >

                  <td className="p-3">
                    {sale.invoice_no}
                  </td>

                  <td className="p-3">
                    {sale.customer_name}
                  </td>

                  <td className="p-3">
                    {sale.sale_date}
                  </td>

                  <td className="p-3">
                    {sale.payment_method}
                  </td>

                  <td className="p-3 text-right">
                    ₹{Number(sale.total_amount).toLocaleString()}
                  </td>

                </tr>

              ))

            )}

          </tbody>

          <tfoot className="bg-gray-100">

            <tr>

              <td
                colSpan="4"
                className="p-3 text-right font-bold"
              >
                Grand Total
              </td>

              <td className="p-3 text-right font-bold">
                ₹{Number(grandTotal).toLocaleString()}
              </td>

            </tr>

          </tfoot>

        </table>

      </div>

    </div>
  );
}