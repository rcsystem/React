import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { llamarApi } from "../api/clienteApi";
import { useAuth } from "../auth/AuthContext";

type RespuestaVerificar = {
  token: string;
  usuario: { rfc: string; correo: string };
};

export function LoginClave() {
  const [rfc, setRfc] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const navegar = useNavigate();
  const { iniciarSesion } = useAuth();

  useEffect(() => {
    const rfcGuardado = sessionStorage.getItem("rfc_login") ?? "";
    setRfc(rfcGuardado);
  }, []);

  async function verificar() {
    setCargando(true);
    setMensaje(null);

    try {
      const datos = await llamarApi<RespuestaVerificar>("/api/auth/verificar-clave", {
        metodo: "POST",
        cuerpo: { rfc: rfc.trim().toUpperCase(), clave: clave.trim() },
      });

      iniciarSesion(datos.token, datos.usuario);
      navegar("/app");
    } catch (e: any) {
      setMensaje(e?.mensaje ?? "No se pudo iniciar sesión.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h2>Verificación</h2>

      <div style={{ marginBottom: 12 }}>
        <strong>RFC:</strong> {rfc || "(sin RFC)"}
      </div>

      <label>Clave recibida por correo</label>
      <input
        value={clave}
        onChange={(e) => setClave(e.target.value)}
        placeholder="123456"
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
      />

      {mensaje && <div style={{ marginBottom: 12 }}>{mensaje}</div>}

      <button onClick={verificar} disabled={cargando || !rfc || !clave.trim()}>
        {cargando ? "Validando..." : "Ingresar"}
      </button>
    </div>
  );
}
