import { Link } from "react-router-dom";

const reports = [
  {
    title: "Sales Report",
    path: "/reports/sales",
    color: "bg-blue-500",
  },
  {
    title: "Purchase Report",
    path: "/reports/purchases",
    color: "bg-green-500",
  },
  {
    title: "Stock Report",
    path: "/reports/stock",
    color: "bg-yellow-500",
  },
  {
    title: "Profit Report",
    path: "/reports/profit",
    color: "bg-purple-500",
  },
];

export default function Reports() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Reports</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report) => (
          <Link
            key={report.path}
            to={report.path}
            className={`${report.color} text-white rounded-xl p-6 shadow-lg hover:scale-105 transition`}
          >
            <h2 className="text-xl font-bold">{report.title}</h2>
            <p className="mt-2 text-sm opacity-90">
              Open {report.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}