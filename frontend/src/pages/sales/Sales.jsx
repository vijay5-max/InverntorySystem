import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import saleService from "../../services/sale.service";
import customerService from "../../services/customer.service";
import productService from "../../services/product.service";

import SaleForm from "./SaleForm";
import SaleTable from "./SaleTable";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // ===========================
  // Load Sales
  // ===========================

  const loadSales = async () => {
    try {
      setLoading(true);

      const response = await saleService.getSales();

      setSales(response.data);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to load sales."
      );

    } finally {

      setLoading(false);

    }
  };

  // ===========================
  // Load Customers
  // ===========================

  const loadCustomers = async () => {
    try {
      const response =
        await customerService.getCustomers();

      setCustomers(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  // ===========================
  // Load Products
  // ===========================

  const loadProducts = async () => {
    try {

      const response =
        await productService.getProducts();

      setProducts(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {

    loadSales();
    loadCustomers();
    loadProducts();

  }, []);

  // ===========================
  // Create Sale
  // ===========================

  const handleCreate = async (saleData) => {

    try {

      await saleService.createSale(saleData);

      alert("Sale created successfully.");

      setShowForm(false);

      loadSales();
      loadProducts();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to create sale."
      );

    }

  };

  // ===========================
  // View Sale
  // ===========================

  const handleView = (sale) => {
  navigate(`/sales/${sale.id}`);
};

    

  // ===========================
  // Delete Sale
  // ===========================

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this sale?"))
      return;

    try {

      await saleService.deleteSale(id);

      alert("Sale deleted successfully.");

      loadSales();
      loadProducts();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to delete sale."
      );

    }

  };

  return (

    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Sales
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          + New Sale
        </button>

      </div>

      {loading ? (

        <p>Loading...</p>

      ) : (

        <SaleTable
          sales={sales}
          onView={handleView}
          onDelete={handleDelete}
        />

      )}

      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-lg shadow-xl w-[1100px]">

            <h2 className="text-2xl font-bold mb-6">
              New Sale
            </h2>

            <SaleForm
              customers={customers}
              products={products}
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
            />

          </div>

        </div>

      )}

    </div>

  );

}