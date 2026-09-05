import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import AppRoutes from "./routes/AppRoutes";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/TemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <ThemeProvider>

      <AuthProvider>

        <AppRoutes />

      </AuthProvider>
      
    </ThemeProvider>

  </React.StrictMode>

);