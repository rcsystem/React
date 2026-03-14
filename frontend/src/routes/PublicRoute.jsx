import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@store/authStore";

export default function PublicRoute() {
  const token = useAuthStore((estado) => estado.token);
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
