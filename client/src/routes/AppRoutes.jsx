import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import EnterOTP from "../pages/Auth/EnterOTP";
import Dashboard from "../pages/Dashboard/Dashboard";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" replace />;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<EnterOTP />} />

      {/* 🔒 Protected */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
