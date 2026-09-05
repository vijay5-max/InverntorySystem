import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function SalesChart({ data = [] }) {
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
          Monthly Sales
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Sales performance over the selected period
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6b7280",
                fontSize: 13,
              }}
              dy={10}
            />

            {/* Y Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6b7280",
                fontSize: 13,
              }}
              tickFormatter={(value) =>
                `₹${Number(value).toLocaleString("en-IN")}`
              }
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{
                fill: "rgba(37, 99, 235, 0.06)",
              }}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
              labelStyle={{
                color: "#111827",
                fontWeight: "600",
                marginBottom: "4px",
              }}
              itemStyle={{
                color: "#2563eb",
                fontWeight: "600",
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Sales",
              ]}
            />

            {/* Sales Bar */}
            <Bar
              dataKey="sales"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
              maxBarSize={55}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}