import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  etiqueta: string;
}

export function Input({ etiqueta, className = '', ...props }: Props) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{etiqueta}</span>
      <input
        {...props}
        className={`w-full rounded-none border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand ${className}`}
      />
    </label>
  );
}
