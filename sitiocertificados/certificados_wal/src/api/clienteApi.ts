const URL_API = import.meta.env.VITE_URL_API as string;

type Opciones = {
  metodo?: "GET" | "POST" | "PUT" | "DELETE";
  token?: string | null;
  cuerpo?: unknown;
};

export async function llamarApi<T>(ruta: string, opciones: Opciones = {}): Promise<T> {
  const { metodo = "GET", token = null, cuerpo } = opciones;

  const resp = await fetch(`${URL_API}${ruta}`, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  });

  const texto = await resp.text();
  const datos = texto ? JSON.parse(texto) : null;

  if (!resp.ok) {
    throw datos ?? { mensaje: "Error en la API" };
  }

  return datos as T;
}
