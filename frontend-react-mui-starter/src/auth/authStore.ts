import { create } from 'zustand';

export type Rol =
  | 'super_admin'
  | 'rh'
  | 'director'
  | 'gerente'
  | 'administrativo'
  | 'sindicalizado';

export interface UsuarioAutenticado {
  id?: number;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email: string;
  roles: Rol[];
  department?: { id: number; name: string } | null;
  position?: { id: number; name: string } | null;
}

type EstadoAuth = {
  token: string | null;
  usuario: UsuarioAutenticado | null;
  establecerSesion: (token: string, usuario: UsuarioAutenticado) => void;
  limpiarSesion: () => void;
};

export const useAuthStore = create<EstadoAuth>((set) => ({
  token: localStorage.getItem('token'),
  usuario: localStorage.getItem('usuario')
    ? JSON.parse(localStorage.getItem('usuario') as string)
    : null,
  establecerSesion: (token, usuario) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    set({ token, usuario });
  },
  limpiarSesion: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    set({ token: null, usuario: null });
  },
}));
