import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  IndianRupee,
  Tag,
  CreditCard,
  Plus,
  ChevronRight,
} from "lucide-react";

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

      setSales(response.data || []);
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

      setCustomers(response.data || []);
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

      setProducts(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // ===========================
  // Initial Load
  // ===========================
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
    if (!window.confirm("Delete this sale?")) {
      return;
    }

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

  // ===========================
  // Sales Statistics
  // ===========================
  const statistics = useMemo(() => {
    const totalSales = sales.length;

    const totalRevenue = sales.reduce(
      (sum, sale) =>
        sum + Number(sale.total_amount || 0),
      0
    );

    const averageSale =
      totalSales > 0
        ? totalRevenue / totalSales
        : 0;

    const pendingPayments = sales.filter(
      (sale) =>
        sale.status === "Pending" ||
        sale.payment_status === "Pending"
    ).length;

    return {
      totalSales,
      totalRevenue,
      averageSale,
      pendingPayments,
    };
  }, [sales]);

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  return (
    <div className="min-h-full bg-slate-50 p-6">

      {/* =========================================
          PAGE HEADER
      ========================================= */}
      <div className="mb-8 flex items-start justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Sales
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="text-slate-500">
              Dashboard
            </span>

            <ChevronRight
              size={16}
              className="text-slate-400"
            />

            <span className="font-medium text-slate-700">
              Sales
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-blue-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            hover:bg-blue-700
            hover:shadow-md
            active:scale-[0.98]
          "
        >
          <Plus size={18} />
          New Sale
        </button>
      </div>

      {/* =========================================
          STATISTICS
      ========================================= */}
      <div
        className="
          mb-8
          grid
          grid-cols-1
          gap-4
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* Total Sales */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-4 md:border-b-0 md:border-r md:pb-0 xl:border-r">
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-blue-50
              text-blue-600
            "
          >
            <ShoppingCart size={26} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Sales
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {statistics.totalSales}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              This month
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-4 md:border-b-0 md:border-r md:pb-0 xl:border-r">
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-emerald-50
              text-emerald-600
            "
          >
            <IndianRupee size={26} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Revenue
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {formatCurrency(
                statistics.totalRevenue
              )}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              This month
            </p>
          </div>
        </div>

        {/* Average Sale */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-4 md:border-b-0 md:border-r md:pb-0 xl:border-r">
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-amber-50
              text-amber-600
            "
          >
            <Tag size={26} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Average Sale
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {formatCurrency(
                statistics.averageSale
              )}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              This month
            </p>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-purple-50
              text-purple-600
            "
          >
            <CreditCard size={26} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Pending Payments
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {statistics.pendingPayments}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              This month
            </p>
          </div>
        </div>

      </div>

      {/* =========================================
          SALES TABLE
      ========================================= */}
      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="text-sm font-medium text-slate-500">
              Loading sales...
            </div>
          </div>
        ) : (
          <SaleTable
            sales={sales}
            onView={handleView}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* =========================================
          NEW SALE MODAL
      ========================================= */}
      {showForm && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-900/50
            p-6
            backdrop-blur-sm
          "
        >
          <div
            className="
              max-h-[90vh]
              w-full
              max-w-6xl
              overflow-y-auto
              rounded-2xl
              bg-white
              shadow-2xl
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-200
                px-6
                py-5
              "
            >
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  New Sale
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new customer sale
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="
                  rounded-lg
                  px-3
                  py-2
                  text-slate-500
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                "
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <SaleForm
                customers={customers}
                products={products}
                onSubmit={handleCreate}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}