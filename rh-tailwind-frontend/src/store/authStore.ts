import { create } from 'zustand';
import type { UsuarioAutenticado } from '../types/auth';

interface EstadoAuth {
  usuario: UsuarioAutenticado | null;
  iniciarSesionDemo: (correo: string) => void;
  cerrarSesion: () => void;
}

export const useAuthStore = create<EstadoAuth>((set) => ({
  usuario: null,
  iniciarSesionDemo: (correo: string) =>
    set({
      usuario: {
        id: 1,
        nombre: 'Guillermo García',
        correo,
        rol: 'rh',
        departamento: 'Recursos Humanos',
      },
    }),
  cerrarSesion: () => set({ usuario: null }),
}));
