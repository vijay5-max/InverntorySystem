import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  PackagePlus,
  UserPlus,
  Truck,
  ArrowRight,
} from "lucide-react";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "New Sale",
      description: "Create a new customer sale",
      icon: ShoppingCart,
      path: "/sales",
    },
    {
      title: "New Purchase",
      description: "Record incoming stock",
      icon: PackagePlus,
      path: "/purchases",
    },
    {
      title: "Add Customer",
      description: "Register a new customer",
      icon: UserPlus,
      path: "/customers",
    },
    {
      title: "Add Supplier",
      description: "Add a new supplier",
      icon: Truck,
      path: "/suppliers",
    },
  ];

  return (
    <div
      className="
        rounded-2xl
        border border-gray-200
        bg-white
        p-6
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Quickly access common tasks
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="
                group
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                p-5
                text-left
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-blue-200
                hover:bg-blue-50
                hover:shadow-sm
                dark:border-slate-700
                dark:bg-slate-800/50
                dark:hover:border-blue-900
                dark:hover:bg-slate-800
              "
            >
              {/* Left */}
              <div className="flex items-center gap-4">

                {/* Icon */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-gray-700
                    shadow-sm
                    transition-all
                    duration-200
                    group-hover:bg-blue-600
                    group-hover:text-white
                    dark:bg-slate-700
                    dark:text-gray-300
                    dark:group-hover:bg-blue-600
                    dark:group-hover:text-white
                  "
                >
                  <Icon size={23} strokeWidth={2} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight
                size={18}
                className="
                  text-gray-400
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                  group-hover:text-blue-600
                  dark:text-gray-500
                  dark:group-hover:text-blue-400
                "
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}