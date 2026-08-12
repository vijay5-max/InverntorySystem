import { useEffect, useState } from "react";

import purchaseService from "../../services/purchase.service";
import supplierService from "../../services/supplier.service";
import productService from "../../services/product.service";

import PurchaseForm from "./PurchaseForm";
import PurchaseTable from "./PurchaseTable";

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // ===========================
  // Load Purchases
  // ===========================

  const loadPurchases = async () => {
    try {
      setLoading(true);

      const response =
        await purchaseService.getPurchases();

      setPurchases(response.data);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to load purchases."
      );

    } finally {

      setLoading(false);

    }
  };

  // ===========================
  // Load Suppliers
  // ===========================

  const loadSuppliers = async () => {

    try {

      const response =
        await supplierService.getSuppliers();

      setSuppliers(response.data);

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

    loadPurchases();
    loadSuppliers();
    loadProducts();

  }, []);

  // ===========================
  // Create Purchase
  // ===========================

  const handleCreate = async (purchaseData) => {

    try {

      await purchaseService.createPurchase(
        purchaseData
      );

      alert("Purchase created successfully.");

      setShowForm(false);

      loadPurchases();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to create purchase."
      );

    }

  };

  // ===========================
  // View Purchase
  // ===========================

  const handleView = (purchase) => {

    console.log(purchase);

    alert(
      "Purchase Details screen will be added next."
    );

  };

  // ===========================
  // Delete Purchase
  // ===========================

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this purchase?"
      )
    )
      return;

    try {

      await purchaseService.deletePurchase(id);

      alert("Purchase deleted.");

      loadPurchases();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to delete purchase."
      );

    }

  };

  return (

    <div className="p-6">

      <div className="flex justify-between items-center mb-5">

        <h1 className="text-3xl font-bold">
          Purchases
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Purchase
        </button>

      </div>

      {loading ? (

        <p>Loading...</p>

      ) : (

        <PurchaseTable
          purchases={purchases}
          onView={handleView}
          onDelete={handleDelete}
        />

      )}

      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white rounded-lg shadow-xl p-6 w-[1100px]">

            <h2 className="text-2xl font-bold mb-6">
              New Purchase
            </h2>

            <PurchaseForm
              suppliers={suppliers}
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