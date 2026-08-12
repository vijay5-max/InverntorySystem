import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">

      <div>
        <h2 className="text-2xl font-semibold flex" >
          Inventory Management System
        </h2>
      </div>

      <div className="flex items-center gap-4">

        <span className="text-gray-600">
          {new Date().toLocaleDateString()}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

    </header>
  );
}