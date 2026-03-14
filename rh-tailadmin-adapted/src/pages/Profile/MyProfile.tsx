import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../auth/AuthContext";

export default function MyProfilePage() {
  const { usuario } = useAuth();

  return (
    <>
      <PageMeta title="Mi perfil | SIE RH" description="Perfil del usuario autenticado" />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-2xl font-bold text-white">{usuario?.nombre?.charAt(0)}</div>
          <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{usuario?.nombre}</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{usuario?.correo}</p>
        </div>
        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Información laboral</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div><dt className="text-sm text-gray-500 dark:text-gray-400">Rol</dt><dd className="mt-1 font-medium text-gray-900 dark:text-white capitalize">{usuario?.rol.replace("_", " ")}</dd></div>
            <div><dt className="text-sm text-gray-500 dark:text-gray-400">Departamento</dt><dd className="mt-1 font-medium text-gray-900 dark:text-white">{usuario?.departamento}</dd></div>
            <div><dt className="text-sm text-gray-500 dark:text-gray-400">Puesto</dt><dd className="mt-1 font-medium text-gray-900 dark:text-white">Analista RH</dd></div>
            <div><dt className="text-sm text-gray-500 dark:text-gray-400">Dirección</dt><dd className="mt-1 font-medium text-gray-900 dark:text-white">Pendiente de captura</dd></div>
          </dl>
        </div>
      </div>
    </>
  );
}
