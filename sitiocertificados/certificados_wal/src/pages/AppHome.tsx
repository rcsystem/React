import { useAuth } from "../auth/AuthContext";

export function AppHome() {
  const { usuario, cerrarSesion } = useAuth();

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 16 }}>
      <h2>Portal</h2>
      <p>
        Sesión iniciada: <strong>{usuario?.rfc}</strong> ({usuario?.correo})
      </p>

      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </div>
  );
}
