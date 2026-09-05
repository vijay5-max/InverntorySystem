import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, UserRound, ShieldCheck } from "lucide-react";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { user, token } = response.data.data;

      login(user, token);

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
            p-8
            shadow-2xl
          "
        >

          {/* Brand */}
          <div className="text-center mb-8">

            <div
              className="
                mx-auto
                mb-4
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-blue-600
                text-xl
                font-bold
                text-white
                shadow-lg
              "
            >
              KW
            </div>

            <h1 className="text-2xl font-bold text-white">
              Khana Weaves
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Inventory Management System
            </p>

          </div>

          {/* Username */}
          <div className="mb-5">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Username
            </label>

            <div className="relative">

              <UserRound
                size={19}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-950
                  py-3
                  pl-11
                  pr-4
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                "
                required
              />

            </div>

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <div className="relative">

              <LockKeyhole
                size={19}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-950
                  py-3
                  pl-11
                  pr-12
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                "
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                  transition
                  hover:text-slate-200
                "
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              py-3
              font-semibold
              text-white
              transition
              hover:bg-blue-500
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading ? (
              "Logging in..."
            ) : (
              <>
                <LockKeyhole size={18} />
                Login
              </>
            )}

          </button>

          {/* Security message */}
          <div
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-2
              text-xs
              text-slate-500
            "
          >
            <ShieldCheck size={15} />

            <span>
              Secure business inventory system
            </span>
          </div>

        </form>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} Khana Weaves
        </p>

      </div>

    </div>
  );
}