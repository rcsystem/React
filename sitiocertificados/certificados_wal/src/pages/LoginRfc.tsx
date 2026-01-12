import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { llamarApi } from "../api/clienteApi";

type RespuestaSolicitar = { mensaje: string };

export function LoginRfc() {
  const [rfc, setRfc] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const navegar = useNavigate();

  async function enviarClave() {
    setCargando(true);
    setMensaje(null);

    try {
      const datos = await llamarApi<RespuestaSolicitar>("/api/auth/solicitar-clave", {
        metodo: "POST",
        cuerpo: { rfc: rfc.trim().toUpperCase() },
      });

      sessionStorage.setItem("rfc_login", rfc.trim().toUpperCase());
      setMensaje(datos.mensaje ?? "Revisa tu correo.");
      navegar("/login-clave");
    } catch (e: any) {
      sessionStorage.setItem("rfc_login", rfc.trim().toUpperCase());
      setMensaje("Si el Epicor ID está registrado, enviamos una clave a tu correo.");
      navegar("/login-clave");
    } finally {
      setCargando(false);
    }
  }

  return (
   <div className="min-h-screen w-screen bg-red-500 flex justify-center items-start pt-10 p-4" style={{ backgroundImage: "url('/fondo.png')" }}>
      <div className="w-full max-w-md rounded-md border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex justify-center">
        {/* Imagen directamente en la raíz de public */}
      <img src="/icon.png" alt="Descripción" style={{
       width:'80px',
      }} />
    
        </div>
        
        <h2 className="text-lg font-semibold text-gray-900 flex justify-center">
          Walworth - Acceso al Portal Certificados
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Ingresa tu <b>Epicor ID</b> y te enviaremos una clave temporal a tu correo.
        </p>

        <input
          value={rfc}
          onChange={(e) => setRfc(e.target.value.toUpperCase())}
          placeholder="XAXX010101000"
          className="mt-2 w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-red-600"
        />

        {mensaje && (
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
            {mensaje}
          </div>
        )}

        <button
          onClick={enviarClave}
          disabled={cargando || !rfc.trim()}
          className="mt-5 w-full rounded-sm bg-red-600 px-4 py-2 font-semibold text-white hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cargando ? "Enviando..." : "Enviar clave"}
        </button>

        <p className="mt-4 text-xs text-gray-500">
          Si el Epicor ID está registrado, recibirás un correo con tu clave.
        </p>
      </div>
    </div>
  );
}
