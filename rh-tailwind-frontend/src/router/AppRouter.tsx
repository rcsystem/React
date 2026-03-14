import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { UsersPage } from '../pages/users/UsersPage';
import { useAuthStore } from '../store/authStore';

function RutaProtegida() {
  const { usuario } = useAuthStore();
  return usuario ? <DashboardLayout /> : <Navigate to="/login" replace />;
}

function PaginaPlaceholder({ titulo }: { titulo: string }) {
  return (
    <div className="border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">{titulo}</h2>
      <p className="mt-2 text-sm text-slate-500">Módulo base listo para conectarse al API.</p>
    </div>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RutaProtegida />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/usuarios" element={<UsersPage />} />
        <Route path="/permisos" element={<PaginaPlaceholder titulo="Permisos" />} />
        <Route path="/inasistencias" element={<PaginaPlaceholder titulo="Inasistencias" />} />
        <Route path="/perfil" element={<PaginaPlaceholder titulo="Mi perfil" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
