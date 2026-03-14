import { useState } from "react";
import { useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useAuth, type Rol } from "../../auth/AuthContext";

type UsuarioDemo = { nombre: string; correo: string; rol: Rol; departamento: string };

const usuariosDemoPorCorreo: Record<string, UsuarioDemo> = {
  "admin@sie.com.mx": {
    nombre: "Guillermo García",
    correo: "admin@sie.com.mx",
    rol: "super_admin",
    departamento: "TI",
  },
  "rh@sie.com.mx": {
    nombre: "Ana Torres",
    correo: "rh@sie.com.mx",
    rol: "rh",
    departamento: "Recursos Humanos",
  },
  "director@sie.com.mx": {
    nombre: "Carlos Medina",
    correo: "director@sie.com.mx",
    rol: "director",
    departamento: "Operaciones",
  },
  "gerente@sie.com.mx": {
    nombre: "María López",
    correo: "gerente@sie.com.mx",
    rol: "gerente",
    departamento: "Finanzas",
  },
  "administrativo@sie.com.mx": {
    nombre: "Iván Pérez",
    correo: "administrativo@sie.com.mx",
    rol: "administrativo",
    departamento: "Compras",
  },
  "sindicalizado@sie.com.mx": {
    nombre: "Rafael Cruz",
    correo: "sindicalizado@sie.com.mx",
    rol: "sindicalizado",
    departamento: "Producción",
  },
};

const usuarioDemoDefault: UsuarioDemo = usuariosDemoPorCorreo["rh@sie.com.mx"];

export default function SignInForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState(usuarioDemoDefault.correo);
  const [password, setPassword] = useState("12345678");

  const iniciar = (e: React.FormEvent) => {
    e.preventDefault();
    const base = usuariosDemoPorCorreo[correo.trim().toLowerCase()] ?? {
      ...usuarioDemoDefault,
      correo: correo.trim() || usuarioDemoDefault.correo,
    };

    login({
      nombre: base.nombre,
      correo: base.correo,
      rol: base.rol,
      departamento: base.departamento,
    });
    navigate("/");
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="mx-auto flex w-full max-w-md flex-1 items-start justify-center px-4 pt-10 lg:pt-16">
        <div className="w-full">
          <div className="mb-8 text-center lg:text-left">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center bg-brand-500 text-xl font-bold text-white">RH</div>
            <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Bienvenido</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Accede al sistema de Recursos Humanos para gestionar permisos, usuarios e incidencias.</p>
          </div>

          <form onSubmit={iniciar}>
            <div className="space-y-5">
              <div>
                <Label>Correo electrónico</Label>
                <Input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="correo@empresa.com" className="rounded-none border-gray-300 dark:border-gray-700" />
              </div>
              <div>
                <Label>Contraseña</Label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" className="rounded-none border-gray-300 pr-11 dark:border-gray-700" />
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer">
                    {showPassword ? <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" /> : <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />}
                  </span>
                </div>
              </div>
              <div>
                <Button className="w-full rounded-none" size="sm">Iniciar sesión</Button>
              </div>
            </div>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
            Demo inicial · usa uno de estos correos para cambiar de perfil sin selector: <span className="font-medium text-gray-700 dark:text-gray-200">admin@, rh@, director@, gerente@, administrativo@, sindicalizado@sie.com.mx</span>
          </div>
        </div>
      </div>
    </div>
  );
}
