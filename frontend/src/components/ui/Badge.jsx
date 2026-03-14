const clases = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800"
};

export default function Badge({ value }) {
  return <span className={`rounded-full px-2 py-1 text-xs font-medium ${clases[value] || "bg-slate-100 text-slate-800"}`}>{value}</span>;
}
