import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { autenticado } = useAuth();
  return autenticado ? <Outlet /> : <Navigate to="/signin" replace />;
}
