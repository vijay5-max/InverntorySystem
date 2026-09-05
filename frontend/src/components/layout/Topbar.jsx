import { useEffect, useState } from "react";
import { CalendarDays, LogOut, Moon, Sun, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-[72px]
        items-center
        justify-between
        border-b
        border-gray-200
        bg-white
        px-6
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* Menu button */}
        <button
          className="
            hidden
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            bg-white
            text-gray-700
            shadow-sm
            transition
            hover:bg-gray-50
            md:flex
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-gray-300
            dark:hover:bg-slate-800
          "
        >
          <Menu size={20} />
        </button>

        {/* Title */}
        <div>
          <h1
            className="
              text-xl
              font-bold
              tracking-tight
              text-gray-900
              dark:text-white
              sm:text-2xl
            "
          >
            Inventory Management System
          </h1>

          <div className="mt-0.5 hidden items-center gap-2 sm:flex">
            <span className="h-2 w-2 rounded-full bg-blue-500" />

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Manage your stock, sales and purchases efficiently
            </p>
          </div>
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* Date */}
        <div
          className="
            hidden
            items-center
            gap-2
            rounded-xl
            bg-blue-50
            px-4
            py-2.5
            text-sm
            font-medium
            text-gray-700
            sm:flex
            dark:bg-slate-900
            dark:text-gray-300
          "
        >
          <CalendarDays
            size={18}
            className="text-blue-600 dark:text-blue-400"
          />

          <span>
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-red-500
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-red-600
            hover:shadow-md
            active:scale-95
          "
        >
          <LogOut size={17} />

          <span className="hidden sm:inline">
            Logout
          </span>
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-gray-200 sm:block dark:bg-slate-700" />

        {/* Theme */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            bg-white
            text-gray-700
            shadow-sm
            transition
            hover:bg-gray-50
            hover:text-blue-600
            active:scale-95
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-gray-300
            dark:hover:bg-slate-800
            dark:hover:text-blue-400
          "
        >
          {darkMode ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}
        </button>

      </div>
    </header>
  );
}