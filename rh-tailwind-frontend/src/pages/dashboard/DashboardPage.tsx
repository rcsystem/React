const tarjetas = [
  { titulo: 'Permisos pendientes', valor: '18' },
  { titulo: 'Inasistencias del día', valor: '4' },
  { titulo: 'Usuarios activos', valor: '286' },
  { titulo: 'Autorizaciones pendientes', valor: '9' },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {tarjetas.map((item) => (
          <article key={item.titulo} className="border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{item.titulo}</p>
            <p className="mt-3 text-3xl font-extrabold text-slate-900">{item.valor}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Permisos recientes</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="border border-slate-200 px-3 py-2">Folio</th>
                  <th className="border border-slate-200 px-3 py-2">Empleado</th>
                  <th className="border border-slate-200 px-3 py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 px-3 py-2">PER-0012</td>
                  <td className="border border-slate-200 px-3 py-2">Rafael Cruz</td>
                  <td className="border border-slate-200 px-3 py-2">Pendiente</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-3 py-2">PER-0013</td>
                  <td className="border border-slate-200 px-3 py-2">María López</td>
                  <td className="border border-slate-200 px-3 py-2">Aprobado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Actividad reciente</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="border-l-4 border-brand bg-red-50 p-3">Se registró una nueva inasistencia en Producción.</li>
            <li className="border-l-4 border-slate-400 bg-slate-50 p-3">RH autorizó un permiso laboral.</li>
            <li className="border-l-4 border-slate-400 bg-slate-50 p-3">Se actualizó el horario del departamento de Finanzas.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
