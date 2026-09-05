import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Tags,
  Package,
  Truck,
  Users,
  ShoppingCart,
  Receipt,
  BarChart3,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: Tags,
  },
  {
    name: "Products",
    path: "/products",
    icon: Package,
  },
  {
    name: "Suppliers",
    path: "/suppliers",
    icon: Truck,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    name: "Purchases",
    path: "/purchases",
    icon: ShoppingCart,
  },
  {
    name: "Sales",
    path: "/sales",
    icon: Receipt,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-20 bg-slate-900 text-white">

      {/* Logo */}
      <div className="relative flex h-20 w-full items-center justify-center border-b border-slate-700">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-600">
          <span className="m-0 p-0 text-m font-bold leading-none">
          KW
          </span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              title={menu.name}
              className={({ isActive }) =>
                `group relative flex items-center justify-center w-full h-12 mb-3 rounded-xl transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              <Icon size={21} strokeWidth={2} />

              {/* Tooltip */}
              <span className="absolute left-16 z-50 hidden group-hover:block whitespace-nowrap rounded-md bg-slate-800 px-3 py-2 text-sm shadow-lg">
                {menu.name}
              </span>
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}