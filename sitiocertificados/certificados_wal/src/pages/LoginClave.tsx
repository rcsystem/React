import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { llamarApi } from "../api/clienteApi";
import { useAuth } from "../auth/AuthContext";

type RespuestaVerificar = {
  token: string;
  usuario: { rfc?: string; epicor_id?: string; correo: string };
};

type RespuestaSolicitar = { mensaje: string };

export function LoginClave() {
  const [epicorId, setEpicorId] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [mensajeTipo, setMensajeTipo] = useState<"success" | "error" | "info">(
    "info"
  );
  const [cargando, setCargando] = useState(false);
  const [reenviando, setReenviando] = useState(false);

  const navegar = useNavigate();
  const { iniciarSesion } = useAuth();

  useEffect(() => {
    const guardado =
      sessionStorage.getItem("epicor_id_login") ??
      sessionStorage.getItem("rfc_login") ??
      "";

    setEpicorId(guardado);
  }, []);

  async function verificar(e?: React.FormEvent) {
    e?.preventDefault();

    if (!clave.trim()) {
      setMensaje("Por favor ingresa la clave temporal");
      setMensajeTipo("error");
      return;
    }

    if (!epicorId.trim()) {
      setMensaje("No se encontró un Epicor ID válido");
      setMensajeTipo("error");
      return;
    }

    setCargando(true);
    setMensaje(null);

    try {
      const datos = await llamarApi<RespuestaVerificar>(
        "/api/auth/verificar-clave",
        {
          metodo: "POST",
          cuerpo: {
            epicor_id: epicorId.trim().toUpperCase(),
            clave: clave.trim(),
          },
        }
      );

      iniciarSesion(datos.token, datos.usuario);
      setMensaje("✓ Inicio de sesión exitoso. Redirigiendo...");
      setMensajeTipo("success");

      // Pequeño delay para mostrar el mensaje de éxito
      setTimeout(() => navegar("/app"), 1000);
    } catch (e: any) {
      setMensaje(
        e?.mensaje ??
          "Clave incorrecta o expirada. Verifica e intenta nuevamente."
      );
      setMensajeTipo("error");
      setClave(""); // Limpiar campo en caso de error
    } finally {
      setCargando(false);
    }
  }

  async function reenviarClave() {
    if (!epicorId.trim()) {
      setMensaje("No hay Epicor ID para reenviar la clave");
      setMensajeTipo("error");
      return;
    }

    setReenviando(true);
    setMensaje(null);

    try {
      const datos = await llamarApi<RespuestaSolicitar>(
        "/api/auth/solicitar-clave",
        {
          metodo: "POST",
          cuerpo: { epicor_id: epicorId.trim().toUpperCase() },
        }
      );

      setMensaje(
        datos.mensaje ?? "✓ Nueva clave enviada. Revisa tu correo electrónico."
      );
      setMensajeTipo("success");
    } catch (e: any) {
      setMensaje(
        "✓ Si el Epicor ID está registrado, enviamos una clave a tu correo."
      );
      setMensajeTipo("success"); // Mostramos como éxito para no revelar información
    } finally {
      setReenviando(false);
    }
  }

  return (
    <div
      className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center p-4"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      {/* Fondo decorativo */}
      <div
        className="fixed inset-0 z-0 opacity-5"
        style={{
          backgroundImage: "url('/fondo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Contenedor principal */}
      <div className="w-full max-w-xl relative z-10">
        {/* Tarjeta de login */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header con logo y marca */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-full shadow-lg">
                <img
                  src="/icon.png"
                  alt="Walworth Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Verificación de Acceso
            </h1>
            <p className="text-red-100 text-sm">
              Portal de Certificados - Walworth
            </p>
          </div>

          {/* Formulario */}
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Clave Temporal
              </h2>
              <p className="text-gray-600 text-sm">
                Ingresa la{" "}
                <span className="font-semibold text-red-600">
                  clave temporal
                </span>{" "}
                que recibiste en tu correo electrónico registrado.
              </p>
            </div>

            {/* Información del Epicor ID */}
            <div className="mb-6 p-2 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Epicor ID
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {epicorId || "(no especificado)"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navegar("/login")}
                  className="text-sm font-medium text-red-600 hover:text-red-800 hover:underline transition-colors duration-200"
                >
                  Cambiar
                </button>
              </div>
            </div>

            <form onSubmit={verificar}>
              <div className="mb-6">
                <label
                  htmlFor="clave"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Clave Temporal
                  <span className="ml-1 text-xs text-gray-500">
                    (6 dígitos)
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="clave"
                    type="text"
                    value={clave}
                    onChange={(e) => {
                      // Solo permitir números
                      const value = e.target.value.replace(/\D/g, "");
                      setClave(value.slice(0, 6)); // Limitar a 6 dígitos
                      setMensaje(null);
                    }}
                    placeholder="000000"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className={`w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-center text-xl font-mono tracking-widest`}
                    disabled={cargando}
                    autoComplete="one-time-code"
                    autoFocus
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <span className="text-sm">{clave.length}/6</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ingresa los 6 dígitos que recibiste por correo
                </p>
              </div>

              {/* Mensajes de estado */}
              {mensaje && (
                <div
                  className={`mb-6 p-4 rounded-lg border ${
                    mensajeTipo === "success"
                      ? "bg-green-50 border-green-200 text-green-700"
                      : mensajeTipo === "error"
                      ? "bg-red-50 border-red-200 text-red-700"
                      : "bg-blue-50 border-blue-200 text-blue-700"
                  }`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {mensajeTipo === "success" ? (
                        <svg
                          className="h-5 w-5 text-green-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : mensajeTipo === "error" ? (
                        <svg
                          className="h-5 w-5 text-red-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-blue-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">{mensaje}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={
                  cargando ||
                  !epicorId.trim() ||
                  !clave.trim() ||
                  clave.length < 6
                }
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md flex items-center justify-center"
              >
                {cargando ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verificando...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verificar e Ingresar
                  </>
                )}
              </button>

              {/* Botón de reenvío */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-sm">¿No recibiste la clave?</span>
                  </div>
                  <button
                    type="button"
                    onClick={reenviarClave}
                    disabled={reenviando || !epicorId.trim()}
                    className="px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 font-medium hover:bg-red-100 hover:border-red-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center"
                  >
                    {reenviando ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Reenviando...
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Reenviar clave temporal
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Información adicional */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800">
                      Información importante
                    </h3>
                    <ul className="mt-2 text-xs text-gray-600 space-y-1">
                      <li>
                        • La clave temporal tiene una validez de 15 minutos
                      </li>
                      <li>
                        • Solo puedes solicitar una nueva clave cada 2 minutos
                      </li>
                      <li>
                        • Verifica tu carpeta de spam si no encuentras el correo
                      </li>
                      <li>
                        • Contacta a soporte si tienes problemas recurrentes
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Walworth Company. Portal de
                Certificados
                <br />
                <span className="text-gray-400">v1.0.0</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
