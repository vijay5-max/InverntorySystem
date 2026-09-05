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
    <div className="p-6 bg-gray-50 min-h-full">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Purchases
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your purchase transactions
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setSelectedPurchase(null);
          }}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-3
            rounded-xl
            font-medium
            shadow-sm
            transition
          "
        >
          + New Purchase
        </button>

      </div>

      {/* Purchase Table */}

      <PurchaseTable
        purchases={purchases}
        onView={handleView}
        onDelete={handleDelete}
      />

      {/* Your existing purchase form/modal stays here */}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-xl p-6 w-[900px] max-w-[95%] max-h-[90vh] overflow-y-auto">

            <h2 className="text-2xl font-bold mb-5">
              New Purchase
            </h2>

            <PurchaseForm
              suppliers={suppliers}
              products={products}
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
              loading={loading}
            />

          </div>

        </div>
      )}

    </div>
  );
}