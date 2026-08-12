import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import saleService from "../../services/sale.service";
import { exportInvoiceExcel } from "../../utils/exportInvoiceExcel";
import { useReactToPrint } from "react-to-print";

export default function SaleDetails() {
  const { id } = useParams();

  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef(null);

  useEffect(() => {
    loadSale();
  }, [id]);

  const loadSale = async () => {
    try {
      const response = await saleService.getSaleById(id);
      setSale(response.data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to load sale."
      );
    } finally {
      setLoading(false);
    }
  };

  // Print only invoice
    const handlePrint = useReactToPrint({
      contentRef: invoiceRef,
      documentTitle: `Invoice-${sale?.invoice_no}`,
    });
    
  const exportExcel = async () => {
    try {
      await exportInvoiceExcel(sale);
    } catch (error) {
      console.error(error);
      alert("Failed to export invoice.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!sale) {
    return <div className="p-6">Sale not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6 print:hidden">

        <h1 className="text-3xl font-bold">
          Sale Details
        </h1>

        <div className="flex gap-3">

          <button
            onClick={exportExcel}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Export Excel
          </button>

          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Print Invoice
          </button>

        </div>

      </div>

      {/* Invoice */}

      <div
        id="invoice"
        ref={invoiceRef}
        className="bg-white rounded-xl shadow-xl p-10"
      >

        {/* Company */}

        <div className="border-b-2 pb-6">

          <div className="flex justify-between items-start">

            <div>

              <h2 className="text-4xl font-bold uppercase">
                Khana Weaves
              </h2>

              <p className="mt-3">
                Near Markandeshwar Temple
              </p>

              <p>
                Guledagudda, Karnataka - 587203
              </p>

              <p>
                Phone : +91 9876543210
              </p>

              <p>
                Email : info@khanaweaves.in
              </p>

              <p>
                Website : www.khanaweaves.in
              </p>

              <p className="mt-3">
                GSTIN : 29ABCDE1234F1Z5
              </p>

              <p>
                PAN : ABCDE1234F
              </p>

            </div>

            <div className="text-right">

              <h2 className="text-4xl font-bold">
                TAX INVOICE
              </h2>

              <p className="text-gray-500">
                Original Copy
              </p>

            </div>

          </div>

        </div>

        {/* Customer */}

        <div className="grid grid-cols-2 gap-8 border-b py-6">

          <div>

            <h3 className="font-bold text-lg mb-3">
              Bill To
            </h3>

            <p><strong>Name :</strong> {sale.customer_name}</p>

            <p><strong>Phone :</strong> {sale.phone}</p>

            <p><strong>Address :</strong> {sale.address || "-"}</p>

          </div>

          <div>

            <h3 className="font-bold text-lg mb-3">
              Invoice Details
            </h3>

            <p>
              <strong>Invoice :</strong> {sale.invoice_no}
            </p>

            <p>
              <strong>Date :</strong>{" "}
              {new Date(sale.sale_date).toLocaleDateString("en-IN")}
            </p>

            <p>
              <strong>Payment :</strong>{" "}
              {sale.payment_method}
            </p>

          </div>

        </div>

        {/* Products */}
          <table className="w-full border border-gray-300 text-sm mt-6">

  <thead className="bg-gray-100">

    <tr>

      <th className="border p-3 text-left w-16">
        #
      </th>

      <th className="border p-3 text-left">
        Product
      </th>

      <th className="border p-3 text-center w-24">
        Qty
      </th>

      <th className="border p-3 text-right w-40">
        Price
      </th>

      <th className="border p-3 text-right w-40">
        Amount
      </th>

    </tr>

  </thead>

  <tbody>

    {(sale.items || []).map((item, index) => (

      <tr key={item.id}>

        <td className="border p-3 text-center">
          {index + 1}
        </td>

        <td className="border p-3">
          {item.product_name}
        </td>

        <td className="border p-3 text-center">
          {item.quantity}
        </td>

        <td className="border p-3 text-right">
          ₹{Number(item.selling_price).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>

        <td className="border p-3 text-right">
          ₹{Number(item.subtotal).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>

      </tr>

    ))}

  </tbody>

</table>

{/* Totals */}

<div className="flex justify-end mt-8">

  <div className="w-96 border rounded-lg overflow-hidden">

    <div className="flex justify-between p-3 border-b">

      <span className="font-medium">
        Discount
      </span>

      <span>
        ₹{Number(sale.discount).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>

    </div>

    <div className="flex justify-between p-3 border-b">

      <span className="font-medium">
        Tax
      </span>

      <span>
        ₹{Number(sale.tax).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>

    </div>

    <div className="flex justify-between p-4 bg-gray-100 text-xl font-bold">

      <span>
        Grand Total
      </span>

      <span>
        ₹{Number(sale.total_amount).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>

    </div>

  </div>

</div>

{/* Terms & Signature */}

<div className="flex justify-between mt-14">

  <div className="w-1/2">

    <h3 className="font-bold text-lg mb-3">
      Terms & Conditions
    </h3>

    <ul className="list-disc ml-5 space-y-2 text-gray-700 text-sm">

      <li>
        Goods once sold will not be taken back or exchanged.
      </li>

      <li>
        Subject to Guledagudda jurisdiction only.
      </li>

      <li>
        Please preserve this invoice for future reference.
      </li>

      <li>
        Thank you for your valuable business.
      </li>

    </ul>

  </div>

  <div className="text-center w-72">

    <div className="h-24"></div>

    <div className="border-t pt-3">

      <p className="font-semibold text-lg">
        Authorized Signature
      </p>

      <p className="text-sm text-gray-500">
        Khana Weaves
      </p>

    </div>

  </div>

</div>

{/* Footer */}

<div className="border-t mt-12 pt-6 text-center">

  <h3 className="text-xl font-bold mb-2">
    Thank You!
  </h3>

  <p className="text-gray-600">
    We appreciate your business and look forward to serving you again.
  </p>

  <p className="mt-3 text-sm text-gray-500">
    This is a computer-generated invoice and does not require a physical signature.
  </p>

</div>

</div>

</div>

);
}