import { useEffect, useState } from "react";
import reportService from "../../services/report.service";

export default function PurchaseReport() {

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const response = await reportService.getPurchaseReport();
      setReport(response);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to load purchase report."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Purchase Report
        </h1>

        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Print
        </button>

      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">Purchase No</th>

              <th className="p-3 text-left">Supplier</th>

              <th className="p-3 text-center">Date</th>

              <th className="p-3 text-right">Amount</th>

            </tr>

          </thead>

          <tbody>

            {(report?.purchases || []).map((purchase) => (

              <tr
                key={purchase.id}
                className="border-t"
              >

                <td className="p-3">
                  {purchase.purchase_no}
                </td>

                <td className="p-3">
                  {purchase.supplier_name}
                </td>

                <td className="p-3 text-center">
                  {new Date(
                    purchase.purchase_date
                  ).toLocaleDateString("en-IN")}
                </td>

                <td className="p-3 text-right">
                  ₹{Number(purchase.total).toLocaleString("en-IN")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-6 flex justify-end">

        <div className="bg-white shadow rounded-lg p-5 w-80">

          <div className="flex justify-between text-xl font-bold">

            <span>Total Purchase</span>

            <span>
              ₹{Number(report.grandTotal).toLocaleString("en-IN")}
            </span>

          </div>

        </div>

      </div>

    </div>
  );

}