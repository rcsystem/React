const usuarios = [
  { nombre: 'Guillermo García', correo: 'ggarcia@sieconsulting.com', rol: 'rh', departamento: 'RH' },
  { nombre: 'Juan Pérez', correo: 'jperez@sieconsulting.com', rol: 'administrativo', departamento: 'Finanzas' },
  { nombre: 'Ana Torres', correo: 'atorres@sieconsulting.com', rol: 'gerente', departamento: 'Operaciones' },
];

export function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Usuarios</h2>
          <p className="text-sm text-slate-500">Administración de personal, roles y departamento.</p>
        </div>
        <button className="border border-brand bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-dark">
          Nuevo usuario
        </button>
      </div>

      <div className="overflow-x-auto border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600">
              <th className="border border-slate-200 px-4 py-3">Nombre</th>
              <th className="border border-slate-200 px-4 py-3">Correo</th>
              <th className="border border-slate-200 px-4 py-3">Rol</th>
              <th className="border border-slate-200 px-4 py-3">Departamento</th>
              <th className="border border-slate-200 px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.correo} className="hover:bg-slate-50">
                <td className="border border-slate-200 px-4 py-3">{usuario.nombre}</td>
                <td className="border border-slate-200 px-4 py-3">{usuario.correo}</td>
                <td className="border border-slate-200 px-4 py-3 uppercase">{usuario.rol}</td>
                <td className="border border-slate-200 px-4 py-3">{usuario.departamento}</td>
                <td className="border border-slate-200 px-4 py-3">
                  <div className="flex gap-2">
                    <button className="border border-slate-300 px-3 py-2 text-xs font-medium hover:bg-slate-50">Editar</button>
                    <button className="border border-red-300 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-50">Baja</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
