import { useEffect, useState } from "react";

import dashboardService from "../../services/dashboard.service";
import reportService from "../../services/report.service";

import SalesChart from "./SalesChart";
import RecentSales from "./RecentSales";
import LowStock from "./LowStock";
import QuickActions from "./QuickActions";

import {
  Package,
  Folder,
  Users,
  Truck,
  ShoppingCart,
  ShoppingBag,
  Wallet,
  IndianRupee,
  AlertTriangle,
  TrendingUp,
  ArrowDownToLine,
} from "lucide-react";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monthlySales, setMonthlySales] = useState([]);

  // ============================
  // Load Dashboard
  // ============================

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response =
        await dashboardService.getDashboard();

      const data = response.data;

      setDashboard(data);

      setMonthlySales(data.monthlySales || []);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Load Monthly Sales
  // ============================

  const loadMonthlySales = async () => {
    try {
      const response =
        await reportService.getMonthlySales();

      setMonthlySales(response || []);
    } catch (error) {
      console.error(
        "Failed to load monthly sales:",
        error
      );
    }
  };

  useEffect(() => {
    loadDashboard();
    loadMonthlySales();
  }, []);

  // ============================
  // Loading
  // ============================

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  // ============================
  // Dashboard Cards
  // ============================

  const cards = [
    {
      title: "Products",
      value: dashboard.totalProducts,
      subtitle: "Total products",
      icon: Package,
    },
    {
      title: "Categories",
      value: dashboard.totalCategories,
      subtitle: "Product categories",
      icon: Folder,
    },
    {
      title: "Customers",
      value: dashboard.totalCustomers,
      subtitle: "Registered customers",
      icon: Users,
    },
    {
      title: "Suppliers",
      value: dashboard.totalSuppliers,
      subtitle: "Active suppliers",
      icon: Truck,
    },
    {
      title: "Purchases",
      value: dashboard.totalPurchases,
      subtitle: "Total purchases",
      icon: ShoppingBag,
    },
    {
      title: "Sales",
      value: dashboard.totalSales,
      subtitle: "Total sales",
      icon: ShoppingCart,
    },
    {
      title: "Purchase Amount",
      value: `₹${Number(
        dashboard.purchaseAmount
      ).toLocaleString("en-IN")}`,
      subtitle: "Total purchase value",
      icon: ArrowDownToLine,
    },
    {
      title: "Sales Amount",
      value: `₹${Number(
        dashboard.salesAmount
      ).toLocaleString("en-IN")}`,
      subtitle: "Total sales value",
      icon: TrendingUp,
    },
    {
      title: "Low Stock",
      value: dashboard.lowStockProducts,
      subtitle: "Products need attention",
      icon: AlertTriangle,
    },
    {
      title: "Today's Sales",
      value: `₹${Number(
        dashboard.todaySales
      ).toLocaleString("en-IN")}`,
      subtitle: "Sales today",
      icon: IndianRupee,
    },
    {
      title: "Today's Purchases",
      value: `₹${Number(
        dashboard.todayPurchases
      ).toLocaleString("en-IN")}`,
      subtitle: "Purchases today",
      icon: Wallet,
    },
  ];

  // ============================
  // UI
  // ============================

  return (
    <div className="p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">

        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
            text-gray-900
            dark:text-white
          "
        >
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of your inventory and business activity
        </p>

      </div>

      {/* Dashboard Cards */}
      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >

        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="
                group
                min-h-[145px]
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-md
                dark:border-slate-800
                dark:bg-slate-900
              "
            >

              {/* Card Header */}
              <div className="flex items-center justify-between">

                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-gray-100
                    text-gray-700
                    transition
                    group-hover:bg-blue-50
                    group-hover:text-blue-600
                    dark:bg-slate-800
                    dark:text-gray-400
                    dark:group-hover:bg-blue-950
                    dark:group-hover:text-blue-400
                  "
                >
                  <Icon size={19} strokeWidth={1.8} />
                </div>

              </div>

              {/* Value */}
              <h2
                className="
                  mt-5
                  truncate
                  text-2xl
                  font-bold
                  tracking-tight
                  text-gray-900
                  dark:text-white
                "
              >
                {card.value}
              </h2>

              {/* Subtitle */}
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                {card.subtitle}
              </p>

            </div>
          );
        })}

      </div>

      {/* Monthly Sales */}
      <div className="mt-8">
        <SalesChart data={monthlySales} />
      </div>

      {/* Recent Sales / Low Stock */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <RecentSales
          sales={dashboard?.recentSales || []}
        />

        <LowStock
          products={
            dashboard?.lowStockProductsList || []
          }
        />

      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <QuickActions />
      </div>

    </div>
  );
}