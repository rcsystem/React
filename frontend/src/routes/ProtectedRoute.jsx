import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@store/authStore";

export default function ProtectedRoute({ roles = [] }) {
  const usuario = useAuthStore((estado) => estado.user);
  const token = useAuthStore((estado) => estado.token);

  if (!token || !usuario) {
    return <Navigate to="/" replace />;
  }

  if (roles.length && !roles.some((rol) => usuario.roles?.includes(rol))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
