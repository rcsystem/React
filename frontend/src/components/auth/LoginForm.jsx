import { useForm } from "react-hook-form";
import { Lock, Mail, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginForm({ onSubmit, loading = false }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { login: "admin@sie.local", password: "password" }
  });

  return (
    <div className="text-slate-700">
      <div className="mb-6 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF2FC] text-[#345089] shadow-sm">
          <svg viewBox="0 0 64 64" className="h-9 w-9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="14" y="20" width="36" height="26" rx="6" fill="currentColor" opacity="0.16" />
            <path d="M22 24H42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M22 31H35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M22 38H30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <circle cx="45" cy="19" r="7" fill="#F39A44" />
          </svg>
        </div>
        <h1 className="text-[20px] font-extrabold text-[#4B5563]">Inicio de sesión</h1>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="block">
          <span className="sr-only">Usuario</span>
          <div className="flex items-center gap-3 rounded-md border border-[#D9DFEA] bg-[#EAF0F8] px-3.5 py-3 text-slate-600 transition focus-within:border-[#B9C7DD] focus-within:bg-white focus-within:shadow-sm">
            <UserRound className="h-5 w-5 text-[#A1AABA]" />
            <input
              type="text"
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-[#6F7B8E]"
              placeholder="Correo o número de nómina"
              {...register("login")}
            />
          </div>
        </label>

        <label className="block">
          <span className="sr-only">Contraseña</span>
          <div className="flex items-center gap-3 rounded-md border border-[#D9DFEA] bg-[#EAF0F8] px-3.5 py-3 text-slate-600 transition focus-within:border-[#B9C7DD] focus-within:bg-white focus-within:shadow-sm">
            <Lock className="h-5 w-5 text-[#A1AABA]" />
            <input
              type="password"
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-[#6F7B8E]"
              placeholder="Contraseña"
              {...register("password")}
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#1E2D42] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#172334] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>

      <div className="mt-7 text-center">
        <Link className="text-sm font-semibold text-[#0A66FF] hover:underline" to="/forgot-password">
          Crear una cuenta
        </Link>
      </div>

      <div className="mt-7 border-t border-slate-200 pt-5 text-center">
        <p className="text-sm font-semibold text-slate-500">Versión 1.0.0 - 2026</p>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white/70 p-4 text-xs text-slate-500 shadow-sm">
        <p className="mb-2 flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.18em] text-slate-400">
          <Mail className="h-4 w-4" />
          Acceso demo
        </p>
        <p className="text-center">
          Usuario: <span className="font-semibold text-slate-700">admin@sie.local o 10001</span>
        </p>
        <p className="mt-1 text-center">
          Contraseña: <span className="font-semibold text-slate-700">password</span>
        </p>
      </div>
    </div>
  );
}
