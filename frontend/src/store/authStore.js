import { create } from "zustand";

const obtenerEstadoInicial = () => {
  const guardado = localStorage.getItem("sie_auth");
  return guardado ? JSON.parse(guardado) : { user: null, token: null };
};

export const useAuthStore = create((set) => ({
  ...obtenerEstadoInicial(),
  login: ({ user, token }) => {
    const estado = { user, token };
    localStorage.setItem("sie_auth", JSON.stringify(estado));
    set(estado);
  },
  logout: () => {
    localStorage.removeItem("sie_auth");
    set({ user: null, token: null });
  }
}));
