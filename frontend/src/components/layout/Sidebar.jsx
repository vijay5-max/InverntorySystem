import { NavLink } from "react-router-dom";

const menus = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Categories", path: "/categories" },
  { name: "Products", path: "/products" },
  { name: "Suppliers", path: "/suppliers" },
  { name: "Customers", path: "/customers" },
  { name: "Purchases", path: "/purchases" },
  { name: "Sales", path: "/sales" },
  { name: "Reports", path: "/reports" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">

      <div className="p-5 border-b border-slate-700">
        <h1 className="text-xl font-bold">
          Khana Weaves Gld
        </h1>
      </div>

      <nav className="p-3">

        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `block rounded px-4 py-3 mb-2 transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"
              }`
            }
          >
            {menu.name}
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}