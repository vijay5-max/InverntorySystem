import {
  BarChart3,
  ShoppingCart,
  Package,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();

  const reports = [
    {
      title: "Sales Report",
      description: "Analyze sales performance and revenue.",
      icon: ShoppingCart,
      path: "/reports/sales",
    },
    {
      title: "Purchase Report",
      description: "Review purchases and supplier spending.",
      icon: BarChart3,
      path: "/reports/purchases",
    },
    {
      title: "Stock Report",
      description: "Monitor current inventory and stock levels.",
      icon: Package,
      path: "/reports/stock",
    },
    {
      title: "Profit Report",
      description: "Track revenue, costs and overall profit.",
      icon: TrendingUp,
      path: "/reports/profit",
    },
  ];

  return (
    <div className="min-h-full bg-slate-50 p-6 lg:p-8 dark:bg-slate-950">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Reports
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          View and analyze your business performance
        </p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {reports.map((report) => {
          const Icon = report.icon;

          return (
            <button
              key={report.path}
              type="button"
              onClick={() => navigate(report.path)}
              className="
                group
                flex
                min-h-[190px]
                flex-col
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                text-left
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-md
                dark:border-slate-800
                dark:bg-slate-900
                dark:hover:border-blue-900
              "
            >
              {/* Icon */}
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-100
                  text-slate-700
                  transition
                  group-hover:bg-blue-600
                  group-hover:text-white
                  dark:bg-slate-800
                  dark:text-slate-300
                  dark:group-hover:bg-blue-600
                  dark:group-hover:text-white
                "
              >
                <Icon size={23} strokeWidth={2} />
              </div>

              {/* Content */}
              <div className="mt-6 flex-1">

                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {report.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {report.description}
                </p>

              </div>

              {/* Action */}
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">

                <span>
                  Open report
                </span>

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                />

              </div>

            </button>
          );
        })}

      </div>

    </div>
  );
}