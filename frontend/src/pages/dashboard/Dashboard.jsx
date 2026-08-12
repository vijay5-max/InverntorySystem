import { useEffect, useState } from "react";
import dashboardService from "../../services/dashboard.service";
import SalesChart from "./SalesChart";
import RecentSales from "./RecentSales";
import LowStock from "./LowStock";
import QuickActions from "./QuickActions";
import reportService from "../../services/report.service";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monthlySales, setMonthlySales] = useState([]);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await dashboardService.getDashboard();

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

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {
    loadMonthlySales();
  }, []);

  const loadMonthlySales = async () => {
    try {
      const response = await reportService.getMonthlySales();

      setMonthlySales(response || []);
    } catch (error) {
      console.error(
        "failed to load monthly sales:",
        error
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  const cards = [
    {
      title: "Products",
      value: dashboard.totalProducts,
      color: "bg-blue-500",
    },
    {
      title: "Categories",
      value: dashboard.totalCategories,
      color: "bg-indigo-500",
    },
    {
      title: "Customers",
      value: dashboard.totalCustomers,
      color: "bg-green-500",
    },
    {
      title: "Suppliers",
      value: dashboard.totalSuppliers,
      color: "bg-yellow-500",
    },
    {
      title: "Purchases",
      value: dashboard.totalPurchases,
      color: "bg-purple-500",
    },
    {
      title: "Sales",
      value: dashboard.totalSales,
      color: "bg-pink-500",
    },
    {
      title: "Purchase Amount",
      value: `₹${Number(
        dashboard.purchaseAmount
      ).toLocaleString()}`,
      color: "bg-orange-500",
    },
    {
      title: "Sales Amount",
      value: `₹${Number(
        dashboard.salesAmount
      ).toLocaleString()}`,
      color: "bg-emerald-600",
    },
    {
      title: "Low Stock",
      value: dashboard.lowStockProducts,
      color: "bg-red-500",
    },
    {
      title: "Today's Sales",
      value: `₹${Number(
        dashboard.todaySales
      ).toLocaleString()}`,
      color: "bg-cyan-500",
    },
    {
      title: "Today's Purchases",
      value: `₹${Number(
        dashboard.todayPurchases
      ).toLocaleString()}`,
      color: "bg-teal-500",
    },
  ];

  return (
    <div className="p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Inventory Overview
        </p>
      </div>
        {/* Dashboard cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {cards.map((card, index) => (

          <div
            key={index}
            className={`${card.color} text-white rounded-xl shadow-lg p-6`}
          >
            <h3 className="text-lg">
              {card.title}
            </h3>

            <h2 className="text-3xl font-bold mt-4">
              {card.value}
            </h2>
          </div>
            
        ))}

      </div>
      {/*Monthly Sale*/}
      <div className="mt-8">
        <SalesChart data={monthlySales} />
      </div>

      {/*Recent Sale*/}
      <div className="grid lg:grid-cols-2 gap-6 mt-8"> 
        <RecentSales sales={dashboard?.recentSales || []} />
        <LowStock products={dashboard?.lowStockProductsList || []} />
      </div>
      <div className="mt-8">
        <QuickActions />
      </div>

    </div>
    
  );
}


