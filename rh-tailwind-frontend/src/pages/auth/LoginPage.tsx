import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Boton } from '../../components/Boton';
import { Input } from '../../components/Input';
import { useAuthStore } from '../../store/authStore';

export function LoginPage() {
  const { usuario, iniciarSesionDemo } = useAuthStore();
  const [correo, setCorreo] = useState('rh@sieconsulting.com');
  const [contrasena, setContrasena] = useState('12345678');

  if (usuario) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-[#f3f4f6] px-4 pt-10 md:pt-16">
      <div className="mx-auto max-w-md">
        <div className="border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border-2 border-brand text-2xl font-black text-brand">
              RH
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Bienvenido</h1>
            <p className="mt-2 text-sm text-slate-500">
              Accede al sistema de Recursos Humanos.
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              iniciarSesionDemo(correo);
            }}
          >
            <Input etiqueta="Correo electrónico" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            <Input etiqueta="Contraseña" type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
            <Boton type="submit" className="w-full">
              Iniciar sesión
            </Boton>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">Versión 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
