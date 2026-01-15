import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { llamarApi } from "../api/clienteApi";

// Tipos para las respuestas de la API
type RespuestaVerificarEpicorId = { 
  valido: boolean;
  mensaje: string;
  tiene_correo?: boolean;
  formato?: string;
};

type RespuestaSolicitarClave = { 
  mensaje: string;
  enviado?: boolean;
  clave_demo?: string;
  expira_en?: string;
  correo_demo?: string;
};

export function LoginRfc() {
  const [rfc, setRfc] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [mensajeTipo, setMensajeTipo] = useState<"success" | "error" | "info">("info");
  const [cargando, setCargando] = useState(false);
  const navegar = useNavigate();

  // Función para validar formato básico
  const validarFormatoIdentificador = (id: string): boolean => {
    const idLimpio = id.trim().toUpperCase();
    if (idLimpio.length < 1 || idLimpio.length > 10) return false;
    
    // Validación básica: solo letras y números
    const formatoValido = /^[A-Z0-9]+$/.test(idLimpio);
    return formatoValido;
  };

  // Función principal para enviar la clave
  async function enviarClave(e?: React.FormEvent) {
    e?.preventDefault();

    if (!rfc.trim()) {
      setMensaje("Por favor ingresa tu Epicor ID");
      setMensajeTipo("error");
      return;
    }

    const idLimpio = rfc.trim().toUpperCase();

    // Validación básica de formato
    if (!validarFormatoIdentificador(idLimpio)) {
      setMensaje(
        "El formato del Epicor ID no es válido. Debe contener solo letras y números (10-50 caracteres)."
      );
      setMensajeTipo("error");
      return;
    }

    setCargando(true);
    setMensaje(null);

    try {
      // PRIMERO: Verificar si el Epicor ID existe
      const verificacion = await llamarApi<RespuestaVerificarEpicorId>("/api/auth/verificar-epicor-id", {
        metodo: "POST",
        cuerpo: { epicor_id: idLimpio },
      });

      if (!verificacion.valido) {
        setMensaje(
          verificacion.mensaje ||
            "El Epicor ID no está registrado en el sistema."
        );
        setMensajeTipo("error");
        setCargando(false);
        return;
      }

      // SEGUNDO: Si es válido, solicitar la clave
      const datos = await llamarApi<RespuestaSolicitarClave>(
        "/api/auth/solicitar-clave",
        {
          metodo: "POST",
          cuerpo: { epicor_id: idLimpio },
        }
      );

      // Guardamos el identificador en sessionStorage
      sessionStorage.setItem("epicor_id_login", idLimpio);

      // Mostrar mensaje apropiado
      let mensajeParaUsuario = datos.mensaje;

      if (datos.enviado === false) {
        mensajeParaUsuario =
          "No se pudo enviar la clave. Por favor contacta a soporte.";
        setMensajeTipo("error");
      } else {
        mensajeParaUsuario =
          "✓ " + (datos.mensaje || "Clave enviada exitosamente.");
        setMensajeTipo("success");
      }

      // Solo en desarrollo mostramos datos demo
      if (import.meta.env.MODE === 'development' && datos.clave_demo) {
        mensajeParaUsuario = `✓ Clave enviada (Demo: ${datos.clave_demo})`;
        console.log("Datos demo:", {
          correo: datos.correo_demo,
          clave: datos.clave_demo,
          expira: datos.expira_en
        });
      }

      setMensaje(mensajeParaUsuario);

      // Solo redirigir si se envió correctamente
      if (datos.enviado !== false) {
        setTimeout(() => {
          navegar("/login-clave");
        }, 2000);
      }
    } catch (error: any) {
      // Manejo específico de errores
      if (error?.status === 404) {
        setMensaje("El Epicor ID no está registrado en el sistema.");
        setMensajeTipo("error");
      } else if (error?.status === 400) {
        setMensaje(
          error?.mensaje || "El Epicor ID no tiene un formato válido."
        );
        setMensajeTipo("error");
      } else if (error?.status === 0) {
        setMensaje("Error de conexión. Por favor verifica tu internet.");
        setMensajeTipo("error");
      } else if (error?.status >= 500) {
        setMensaje("Error del servidor. Por favor intenta más tarde.");
        setMensajeTipo("error");
      } else {
        setMensaje(
          "Error al procesar tu solicitud. Por favor intenta nuevamente."
        );
        setMensajeTipo("error");
      }
      console.error("Error en enviarClave:", error);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center p-4" style={{ backgroundImage: "url('/fondo.png')" }}>
      {/* Fondo decorativo */}
      <div 
        className="fixed inset-0 z-0 opacity-5"
        style={{
          backgroundImage: "url('/fondo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Contenedor principal */}
      <div className="w-full max-w-lg relative z-10">
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
              Portal de Certificados
            </h1>
            <p className="text-red-100 text-sm">Walworth Company</p>
          </div>
          
          {/* Formulario */}
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Acceso al sistema
              </h2>
              <p className="text-gray-600 text-sm">
                Ingresa tu{" "}
                <span className="font-semibold text-red-600">Epicor ID</span> y te 
                enviaremos una clave temporal a tu correo registrado.
              </p>
            </div>

            <form onSubmit={enviarClave}>
              <div className="mb-6">
                <label htmlFor="rfc" className="block text-sm font-medium text-gray-700 mb-2">
                  Epicor ID
                  <span className="ml-1 text-xs text-gray-500">(Formato: XAXX010101000)</span>
                </label>
                <div className="relative">
                  <input
                    id="rfc"
                    type="text"
                    value={rfc}
                    onChange={(e) => {
                      setRfc(e.target.value.toUpperCase());
                      setMensaje(null); // Limpiar mensajes cuando el usuario escribe
                    }}
                    placeholder="Ejemplo: XAXX010101000"
                    className={`w-full px-4 py-3 pl-11 rounded-lg border ${
                      mensajeTipo === "error" && mensaje ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
                    disabled={cargando}
                    autoComplete="username"
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
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                {!rfc.trim() ? (
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
                    Ingresa tu identificador único del sistema
                  </p>
                ) : !validarFormatoIdentificador(rfc) && (
                  <p className="mt-2 text-xs text-amber-600 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verifica el formato (solo letras y números, 10-50 caracteres)
                  </p>
                )}
              </div>

              {/* Mensajes de estado */}
              {mensaje && (
                <div className={`mb-6 p-4 rounded-lg border ${
                  mensajeTipo === "success" 
                    ? "bg-green-50 border-green-200 text-green-700" 
                    : mensajeTipo === "error"
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-blue-50 border-blue-200 text-blue-700"
                }`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {mensajeTipo === "success" ? (
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : mensajeTipo === "error" ? (
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">{mensaje}</p>
                      {mensajeTipo === "success" && (
                        <p className="text-xs mt-1 opacity-90 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Redirigiendo a verificación...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={cargando || !rfc.trim()}
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
                    Procesando solicitud...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Solicitar clave de acceso
                  </>
                )}
              </button>
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
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800">
                      Proceso de verificación
                    </h3>
                    <ul className="mt-2 text-xs text-gray-600 space-y-1">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">✓</span>
                        <span>Ingresa tu Epicor ID o RFC registrado</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">✓</span>
                        <span>Recibirás una clave temporal por correo</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">✓</span>
                        <span>La clave expira en 15 minutos</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">✓</span>
                        <span>Verifica tu carpeta de spam si no encuentras el correo</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              
              <p className="mt-6 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Walworth Company. Todos los derechos reservados.
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