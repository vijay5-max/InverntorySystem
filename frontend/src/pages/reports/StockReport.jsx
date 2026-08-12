import { useEffect, useState } from "react";
import reportService from "../../services/report.service";

export default function StockReport() {

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const data = await reportService.getStockReport();
      setReport(data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to load stock report."
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
          Stock Report
        </h1>

        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Print
        </button>

      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">Barcode</th>

              <th className="p-3 text-left">Product</th>

              <th className="p-3 text-left">Category</th>

              <th className="p-3 text-left">Brand</th>

              <th className="p-3 text-right">Purchase</th>

              <th className="p-3 text-right">Selling</th>

              <th className="p-3 text-center">Qty</th>

              <th className="p-3 text-center">Status</th>

            </tr>

          </thead>

          <tbody>

            {(report?.products || []).map((product) => (

              <tr
                key={product.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-3">
                  {product.barcode}
                </td>

                <td className="p-3">
                  {product.product_name}
                </td>

                <td className="p-3">
                  {product.category_name}
                </td>

                <td className="p-3">
                  {product.brand}
                </td>

                <td className="p-3 text-right">
                  ₹{Number(product.purchase_price).toLocaleString("en-IN")}
                </td>

                <td className="p-3 text-right">
                  ₹{Number(product.selling_price).toLocaleString("en-IN")}
                </td>

                <td className="p-3 text-center">
                  {product.quantity}
                </td>

                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">

        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-500">Products</h3>
          <p className="text-2xl font-bold">
            {report?.totalProducts}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-500">Stock Quantity</h3>
          <p className="text-2xl font-bold">
            {report?.totalStock}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-500">Stock Value</h3>
          <p className="text-2xl font-bold">
            ₹{Number(report?.stockValue || 0).toLocaleString("en-IN")}
          </p>
        </div>

      </div>

    </div>
  );

}