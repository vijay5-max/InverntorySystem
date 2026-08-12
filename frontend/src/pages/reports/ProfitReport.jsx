import { useEffect, useState } from "react";
import reportService from "../../services/report.service";

export default function ProfitReport() {

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const data = await reportService.getProfitReport();
      setReport(data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to load profit report."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Profit Report
        </h1>

        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Print
        </button>

      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">Product</th>

              <th className="p-3 text-center">Sold Qty</th>

              <th className="p-3 text-right">Sales</th>

              <th className="p-3 text-right">Cost</th>

              <th className="p-3 text-right">Profit</th>

            </tr>

          </thead>

          <tbody>

            {(report?.profit || []).map((item) => (

              <tr key={item.id} className="border-t">

                <td className="p-3">
                  {item.product_name}
                </td>

                <td className="p-3 text-center">
                  {item.sold_quantity}
                </td>

                <td className="p-3 text-right">
                  ₹{Number(item.sales_amount).toLocaleString("en-IN")}
                </td>

                <td className="p-3 text-right">
                  ₹{Number(item.purchase_cost).toLocaleString("en-IN")}
                </td>

                <td className="p-3 text-right font-semibold text-green-600">
                  ₹{Number(item.profit).toLocaleString("en-IN")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">

        <div className="bg-white shadow rounded-lg p-5">

          <h3>Total Sales</h3>

          <p className="text-2xl font-bold">
            ₹{Number(report.totalSales).toLocaleString("en-IN")}
          </p>

        </div>

        <div className="bg-white shadow rounded-lg p-5">

          <h3>Total Cost</h3>

          <p className="text-2xl font-bold">
            ₹{Number(report.totalCost).toLocaleString("en-IN")}
          </p>

        </div>

        <div className="bg-white shadow rounded-lg p-5">

          <h3>Total Profit</h3>

          <p className="text-2xl font-bold text-green-600">
            ₹{Number(report.totalProfit).toLocaleString("en-IN")}
          </p>

        </div>

      </div>

    </div>
  );

}