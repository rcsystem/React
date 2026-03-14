import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const menu = [
  { nombre: 'Dashboard', ruta: '/' },
  { nombre: 'Usuarios', ruta: '/usuarios' },
  { nombre: 'Permisos', ruta: '/permisos' },
  { nombre: 'Inasistencias', ruta: '/inasistencias' },
  { nombre: 'Mi perfil', ruta: '/perfil' },
];

export function DashboardLayout() {
  const location = useLocation();
  const { usuario, cerrarSesion } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-200 bg-white lg:block">
          <div className="border-b border-slate-200 px-6 py-5">
            <p className="text-xl font-black tracking-wide text-brand">RH SYSTEM</p>
            <p className="mt-1 text-sm text-slate-500">Panel administrativo</p>
          </div>
          <div className="px-4 py-4">
            <div className="mb-6 border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-800">{usuario?.nombre}</p>
              <p className="text-sm text-slate-500">{usuario?.departamento}</p>
              <p className="mt-2 inline-block bg-brand px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {usuario?.rol}
              </p>
            </div>
            <nav className="space-y-1">
              {menu.map((item) => {
                const activo = location.pathname === item.ruta;
                return (
                  <Link
                    key={item.ruta}
                    to={item.ruta}
                    className={`block border px-4 py-3 text-sm font-medium transition ${
                      activo
                        ? 'border-brand bg-brand text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {item.nombre}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="flex-1">
          <header className="border-b border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-slate-900">Sistema de Recursos Humanos</h1>
                <p className="text-sm text-slate-500">Gestión de usuarios, permisos e inasistencias</p>
              </div>
              <button
                onClick={cerrarSesion}
                className="border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cerrar sesión
              </button>
            </div>
          </header>

          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
