import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, CalendarCheck2, HandHelping, Fingerprint, LogOut } from "lucide-react";
import { useAuthStore } from "@store/authStore";
import { authService } from "@services/api";

const menu = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/users", label: "Usuarios", icon: Users },
  { to: "/permission-requests", label: "Permisos", icon: HandHelping },
  { to: "/vacations", label: "Vacaciones", icon: CalendarCheck2 },
  { to: "/biometric/records", label: "Biométrico", icon: Fingerprint }
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const usuario = useAuthStore((estado) => estado.user);
  const cerrarSesion = useAuthStore((estado) => estado.logout);

  const salir = async () => {
    try { await authService.logout(); } catch {}
    cerrarSesion();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white lg:block">
        <div className="border-b border-slate-100 p-6">
          <Link to="/dashboard" className="text-xl font-bold text-slate-900">SIE App</Link>
          <p className="text-sm text-slate-500">{usuario?.name}</p>
        </div>
        <nav className="space-y-2 p-4">
          {menu.map((item) => {
            const Icono = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${isActive ? "bg-primary text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                <Icono size={18} /> {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">Portal sindical</h2>
              <p className="text-sm text-slate-500">{usuario?.roles?.join(", ")}</p>
            </div>
            <button onClick={salir} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50">
              <LogOut size={16} /> Salir
            </button>
          </div>
        </header>
        <main className="p-6"><Outlet /></main>
      </div>
    </div>
  );
}
