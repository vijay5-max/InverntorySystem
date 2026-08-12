import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Categories from "../pages/categories/Categories";
import Products from "../pages/products/Products";
import Suppliers from "../pages/suppliers/Suppliers";
import Customers from "../pages/customers/Customers";
import Purchases from "../pages/purchases/Purchases";
import Sales from "../pages/sales/Sales";
import Reports from "../pages/reports/Reports";
import SalesReport from "../pages/reports/SalesReport";
import PurchaseReport from "../pages/reports/PurchaseReport";
import StockReport from "../pages/reports/StockReport";
import ProfitReport from "../pages/reports/ProfitReport";
import SaleDetails from "../pages/sales/SaleDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Layout */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/sales" element={<SalesReport />} />
          <Route path="/reports/purchases" element={<PurchaseReport />} />
          <Route path="/reports/stock" element={<StockReport />} />
          <Route path="/reports/profit" element={<ProfitReport />} />
          <Route path="/sales/:id" element={<SaleDetails />} />
        </Route>

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;