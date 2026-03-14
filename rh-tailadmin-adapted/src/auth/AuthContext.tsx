import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Rol =
  | "super_admin"
  | "rh"
  | "director"
  | "gerente"
  | "administrativo"
  | "sindicalizado";

export type UsuarioSesion = {
  nombre: string;
  correo: string;
  rol: Rol;
  departamento: string;
};

type AuthContextType = {
  usuario: UsuarioSesion | null;
  login: (usuario: UsuarioSesion) => void;
  logout: () => void;
  autenticado: boolean;
};

const STORAGE_KEY = "rh_usuario_demo";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);

  useEffect(() => {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (guardado) {
      try {
        setUsuario(JSON.parse(guardado));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      usuario,
      autenticado: Boolean(usuario),
      login: (nuevoUsuario: UsuarioSesion) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoUsuario));
        setUsuario(nuevoUsuario);
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setUsuario(null);
      },
    }),
    [usuario]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
