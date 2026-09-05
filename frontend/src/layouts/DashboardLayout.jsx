import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100 text-black dark:bg-slate-950 dark:text-white">

      <Sidebar />

      <div className="ml-20 flex min-h-screen flex-col">

        <Topbar />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}