import React, { createContext, useContext, useMemo, useState } from "react";

type Usuario = { rfc: string; correo: string };

type AuthState = {
  token: string | null;
  usuario: Usuario | null;
  iniciarSesion: (token: string, usuario: Usuario) => void;
  cerrarSesion: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token_portal"));
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const raw = localStorage.getItem("usuario_portal");
    return raw ? JSON.parse(raw) : null;
  });

  function iniciarSesion(tokenNuevo: string, usuarioNuevo: Usuario) {
    setToken(tokenNuevo);
    setUsuario(usuarioNuevo);
    localStorage.setItem("token_portal", tokenNuevo);
    localStorage.setItem("usuario_portal", JSON.stringify(usuarioNuevo));
  }

  function cerrarSesion() {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem("token_portal");
    localStorage.removeItem("usuario_portal");
    sessionStorage.removeItem("epicor_id_login");
  }

  const valor = useMemo(() => ({ token, usuario, iniciarSesion, cerrarSesion }), [token, usuario]);
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
