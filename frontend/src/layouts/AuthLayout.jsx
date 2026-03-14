import { Outlet } from "react-router-dom";
import LoginIllustration from "@components/auth/LoginIllustration";

function LogoMarca() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF3FA] text-[#22314D]">
        <svg viewBox="0 0 64 64" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 8L39.8 23.8L56 32L39.8 40.2L32 56L24.2 40.2L8 32L24.2 23.8L32 8Z" fill="currentColor" />
        </svg>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
          SIE
        </p>
        <p className="text-sm font-bold text-slate-700">Sistema de Integración Empresarial</p>
      </div>
    </div>
  );
}

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      <div className="mx-auto flex min-h-screen max-w-[1720px] items-center px-6 py-8 xl:px-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.6fr_380px] xl:gap-16">
          <section className="hidden lg:flex lg:flex-col lg:justify-center">
            <div className="mb-8">
              <LogoMarca />
            </div>

            <div className="relative overflow-hidden rounded-[40px] bg-transparent px-2 py-2">
              <div className="pointer-events-none absolute left-10 top-20 h-40 w-40 rounded-full bg-[#EAEFF8] blur-2xl" />
              <div className="pointer-events-none absolute bottom-16 right-20 h-36 w-36 rounded-full bg-[#EEF2F9] blur-2xl" />
              <LoginIllustration />
            </div>
          </section>

          <section className="flex min-h-[720px] items-center justify-center">
            <div className="w-full rounded-[22px] bg-transparent px-3 py-4 sm:px-6 lg:px-0">
              <div className="mx-auto w-full max-w-[340px]">
                <div className="mb-8 text-center lg:hidden">
                  <div className="flex justify-center">
                    <LogoMarca />
                  </div>
                </div>

                <Outlet />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
