import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { llamarApi } from "../api/clienteApi";

type Documento = {
  id: number;
  nombre: string;
  tipo: "certificado" | "orden" | "factura" | "otro";
  fecha: string;
  tamaño: string;
  url_descarga: string;
  descripcion?: string;
};

type BusquedaRequest = {
  epicor_id: string;
  numero_serie?: string;
  orden_compra?: string;
  tipo_busqueda: "serie" | "orden";
};

type BusquedaResponse = {
  documentos: Documento[];
  mensaje: string;
  total: number;
};

export function AppHome() {
  const { usuario, cerrarSesion } = useAuth();
  const [filtro, setFiltro] = useState("");
  const [tipoBusqueda, setTipoBusqueda] = useState<"serie" | "orden">("serie");
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const buscarDocumentos = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!filtro.trim()) {
      setError(
        "Por favor ingresa un número de " +
          (tipoBusqueda === "serie" ? "serie" : "orden de compra")
      );
      return;
    }

    if (!usuario?.epicor_id) {
      setError(
        "No se encontró tu Epicor ID. Por favor inicia sesión nuevamente."
      );
      return;
    }

    setCargando(true);
    setError(null);
    setBusquedaRealizada(true);

    try {
      const requestData: BusquedaRequest = {
        epicor_id: usuario.epicor_id,
        tipo_busqueda: tipoBusqueda,
      };

      // Dependiendo del tipo de búsqueda, enviamos diferente parámetro
      if (tipoBusqueda === "serie") {
        requestData.numero_serie = filtro.trim();
      } else {
        requestData.orden_compra = filtro.trim();
      }

      const respuesta = await llamarApi<BusquedaResponse>(
        "/api/documentos/buscar",
        {
          metodo: "POST",
          cuerpo: requestData,
        }
      );

      setDocumentos(respuesta.documentos || []);

      if ((respuesta.documentos || []).length === 0) {
        setError("No se encontraron documentos para esta búsqueda.");
      }
    } catch (error: any) {
      console.error("Error en búsqueda:", error);

      if (error?.status === 404) {
        setError("No se encontraron documentos para esta búsqueda.");
      } else if (error?.status === 400) {
        setError(error?.mensaje || "Datos de búsqueda inválidos.");
      } else if (error?.status === 403) {
        setError("No tienes permisos para acceder a estos documentos.");
      } else if (error?.status === 0) {
        setError("Error de conexión. Verifica tu internet.");
      } else {
        setError("Error al buscar documentos. Intenta nuevamente.");
      }

      setDocumentos([]);
    } finally {
      setCargando(false);
    }
  };

  const handleLimpiar = () => {
    setFiltro("");
    setDocumentos([]);
    setError(null);
    setBusquedaRealizada(false);
  };

  const handleDescargar = async (documento: Documento) => {
    try {
      // Abrir en nueva pestaña o descargar directamente
      window.open(documento.url_descarga, "_blank");

      // Opcional: Registrar descarga en analytics
      await llamarApi("/api/documentos/registrar-descarga", {
        metodo: "POST",
        cuerpo: { documento_id: documento.id },
      });
    } catch (error) {
      console.error("Error al descargar:", error);
      // Si falla la API, intentar descarga directa
      window.open(documento.url_descarga, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header/Navbar */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-white p-2 rounded-lg">
                <img
                  src="/icon.png"
                  alt="Walworth Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Portal de Documentos</h1>
                <p className="text-red-100 text-sm">Walworth Company</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6">
              <div className="bg-red-700/30 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm text-red-50">Conectado como</p>
                <p className="font-semibold">
                  {usuario?.epicor_id || usuario?.rfc}
                </p>
                <p className="text-xs text-red-100">{usuario?.correo}</p>
              </div>

              <button
                onClick={cerrarSesion}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Panel de bienvenida */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Bienvenido al Portal de Documentos
          </h2>
          <p className="text-gray-600">
            Busca y descarga tus certificados, serie u órdenes de compra
          </p>
        </div>

        {/* Panel de búsqueda */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Buscar Documentos
              </h2>
              <p className="text-gray-600">
                Ingresa un número de serie u orden de compra para buscar
                documentos relacionados
              </p>
            </div>

            {/* Selector de tipo de búsqueda */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                  <button
                    onClick={() => {
                      setTipoBusqueda("serie");
                      setFiltro("");
                      setDocumentos([]);
                      setError(null);
                    }}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      tipoBusqueda === "serie"
                        ? "bg-white shadow-sm text-red-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      <span>Buscar por Serie</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setTipoBusqueda("orden");
                      setFiltro("");
                      setDocumentos([]);
                      setError(null);
                    }}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      tipoBusqueda === "orden"
                        ? "bg-white shadow-sm text-red-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Buscar por Orden de Compra</span>
                    </div>
                  </button>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-500">
                    {tipoBusqueda === "serie"
                      ? "Ingresa el número de serie del producto"
                      : "Ingresa el número de orden de compra"}
                  </p>
                </div>
              </div>
            </div>

            {/* Formulario de búsqueda */}
            <form onSubmit={buscarDocumentos}>
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    placeholder={
                      tipoBusqueda === "serie"
                        ? "Ejemplo: SERIE-2024-001, SN-123456"
                        : "Ejemplo: OC-2024-001, PO-123456"
                    }
                    className="w-full px-5 py-4 pl-14 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-3 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 text-lg"
                    disabled={cargando}
                  />

                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {tipoBusqueda === "serie" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>

                  {filtro && (
                    <button
                      type="button"
                      onClick={handleLimpiar}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {error && busquedaRealizada && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {error}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={cargando || !filtro.trim()}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center"
              >
                {cargando ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
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
                    Buscando documentos...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Buscar Documentos
                  </>
                )}
              </button>
            </form>

            {/* Resultados de búsqueda */}
            {busquedaRealizada && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Resultados de búsqueda
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {tipoBusqueda === "serie"
                        ? `Serie buscada: ${filtro}`
                        : `Orden de compra buscada: ${filtro}`}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {documentos.length} documento
                    {documentos.length !== 1 ? "s" : ""} encontrado
                    {documentos.length !== 1 ? "s" : ""}
                  </div>
                </div>

                {documentos.length === 0 && !cargando && !error ? (
                  <div className="text-center py-12">
                    <div className="mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-gray-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No se encontraron documentos
                    </h3>
                    <p className="text-gray-500">
                      No hay documentos asociados a esta búsqueda.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documentos.map((documento) => (
                      <div
                        key={documento.id}
                        className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-3 rounded-lg ${
                                documento.tipo === "certificado"
                                  ? "bg-green-50"
                                  : documento.tipo === "orden"
                                  ? "bg-blue-50"
                                  : documento.tipo === "factura"
                                  ? "bg-purple-50"
                                  : "bg-gray-50"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 ${
                                  documento.tipo === "certificado"
                                    ? "text-green-600"
                                    : documento.tipo === "orden"
                                    ? "text-blue-600"
                                    : documento.tipo === "factura"
                                    ? "text-purple-600"
                                    : "text-gray-600"
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div>
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                  documento.tipo === "certificado"
                                    ? "bg-green-100 text-green-800"
                                    : documento.tipo === "orden"
                                    ? "bg-blue-100 text-blue-800"
                                    : documento.tipo === "factura"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {documento.tipo.charAt(0).toUpperCase() +
                                  documento.tipo.slice(1)}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {documento.tamaño}
                          </span>
                        </div>

                        <h4 className="font-semibold text-gray-800 mb-2">
                          {documento.nombre}
                        </h4>

                        {documento.descripcion && (
                          <p className="text-sm text-gray-600 mb-4">
                            {documento.descripcion}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {new Date(documento.fecha).toLocaleDateString(
                              "es-ES"
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDescargar(documento)}
                          className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Descargar PDF
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Instrucciones */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            ¿Cómo buscar documentos?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="bg-red-100 p-2 rounded-lg mr-3">
                  <span className="text-red-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-800">
                  Selecciona tipo de búsqueda
                </h4>
              </div>
              <p className="text-gray-600 text-sm">
                Elige entre buscar por número de serie del producto o por número
                de orden de compra.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="bg-red-100 p-2 rounded-lg mr-3">
                  <span className="text-red-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-800">
                  Ingresa el número
                </h4>
              </div>
              <p className="text-gray-600 text-sm">
                Escribe el número completo o parcial en el campo de búsqueda. El
                sistema buscará coincidencias exactas.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="bg-red-100 p-2 rounded-lg mr-3">
                  <span className="text-red-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-800">
                  Descarga documentos
                </h4>
              </div>
              <p className="text-gray-600 text-sm">
                Descarga los tus certificados encontrados en documentos PDF.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Walworth Company. Portal de
                Documentos.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-gray-500 text-sm">v1.0.0</p>
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Conectado como: {usuario?.epicor_id}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
