const variantes = {
  primary: "bg-primary text-white hover:opacity-90",
  secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300",
  danger: "bg-red-600 text-white hover:bg-red-700"
};

export default function Button({ className = "", variant = "primary", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition ${variantes[variant]} ${className}`}
      {...props}
    />
  );
}
