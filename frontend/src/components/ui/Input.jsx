export default function Input({ label, error, ...props }) {
  return (
    <label className="block space-y-1">
      {label ? <span className="text-sm font-medium text-slate-700">{label}</span> : null}
      <input className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary" {...props} />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
