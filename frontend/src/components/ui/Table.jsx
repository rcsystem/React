export default function Table({ columns = [], rows = [] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              {columns.map((columna) => <th key={columna.key} className="px-4 py-3 font-semibold">{columna.title}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((fila, indice) => (
              <tr key={fila.id || indice} className="border-t border-slate-100">
                {columns.map((columna) => (
                  <td key={columna.key} className="px-4 py-3 align-top">{columna.render ? columna.render(fila) : fila[columna.key] ?? "-"}</td>
                ))}
              </tr>
            )) : (
              <tr><td className="px-4 py-6 text-center text-slate-500" colSpan={columns.length}>Sin registros</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
