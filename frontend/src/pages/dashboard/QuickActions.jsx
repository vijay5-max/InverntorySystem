import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  PackagePlus,
  UserPlus,
  Truck,
} from "lucide-react";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "New Sale",
      icon: ShoppingCart,
      color: "bg-green-500",
      path: "/sales",
    },
    {
      title: "New Purchase",
      icon: PackagePlus,
      color: "bg-blue-500",
      path: "/purchases",
    },
    {
      title: "Add Customer",
      icon: UserPlus,
      color: "bg-purple-500",
      path: "/customers",
    },
    {
      title: "Add Supplier",
      icon: Truck,
      color: "bg-orange-500",
      path: "/suppliers",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className={`${action.color} text-white rounded-xl p-5 transition duration-300 hover:scale-105`}
            >
              <Icon
                size={34}
                className="mx-auto mb-3"
              />

              <p className="font-semibold">
                {action.title}
              </p>
            </button>
          );
        })}

      </div>

    </div>
  );
}