export type Rol = 'super_admin' | 'rh' | 'director' | 'gerente' | 'administrativo' | 'sindicalizado';

export interface UsuarioAutenticado {
  id: number;
  nombre: string;
  correo: string;
  rol: Rol;
  departamento: string;
}
