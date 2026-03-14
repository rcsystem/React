import {
  Badge,
  Business,
  Dashboard,
  Description,
  Groups,
  Key,
  Person,
  PlaylistAddCheck,
  Rule,
  Schedule,
  UploadFile,
  Work,
} from '@mui/icons-material';
import type { ReactNode } from 'react';
import type { Rol } from '../auth/authStore';

export interface OpcionMenu {
  etiqueta: string;
  ruta: string;
  icono: ReactNode;
  roles: Rol[];
}

export const menuApp: OpcionMenu[] = [
  {
    etiqueta: 'Dashboard',
    ruta: '/',
    icono: <Dashboard />,
    roles: ['super_admin', 'rh', 'director', 'gerente', 'administrativo', 'sindicalizado'],
  },
  {
    etiqueta: 'Permisos',
    ruta: '/permisos',
    icono: <Description />,
    roles: ['super_admin', 'rh', 'director', 'gerente', 'administrativo', 'sindicalizado'],
  },
  {
    etiqueta: 'Autorizaciones',
    ruta: '/autorizaciones',
    icono: <PlaylistAddCheck />,
    roles: ['super_admin', 'rh', 'director', 'gerente'],
  },
  {
    etiqueta: 'Inasistencias',
    ruta: '/inasistencias',
    icono: <Badge />,
    roles: ['super_admin', 'rh', 'director', 'gerente'],
  },
  {
    etiqueta: 'Usuarios',
    ruta: '/usuarios',
    icono: <Groups />,
    roles: ['super_admin', 'rh'],
  },
  {
    etiqueta: 'Departamentos',
    ruta: '/departamentos',
    icono: <Business />,
    roles: ['super_admin', 'rh'],
  },
  {
    etiqueta: 'Puestos',
    ruta: '/puestos',
    icono: <Work />,
    roles: ['super_admin', 'rh'],
  },
  {
    etiqueta: 'Horarios',
    ruta: '/horarios',
    icono: <Schedule />,
    roles: ['super_admin', 'rh'],
  },
  {
    etiqueta: 'Carga Excel',
    ruta: '/importacion',
    icono: <UploadFile />,
    roles: ['super_admin', 'rh'],
  },
  {
    etiqueta: 'Reglas del sistema',
    ruta: '/configuracion',
    icono: <Rule />,
    roles: ['super_admin', 'rh'],
  },
  {
    etiqueta: 'Mi perfil',
    ruta: '/perfil',
    icono: <Person />,
    roles: ['super_admin', 'rh', 'director', 'gerente', 'administrativo', 'sindicalizado'],
  },
  {
    etiqueta: 'Cambiar contraseña',
    ruta: '/cambiar-password',
    icono: <Key />,
    roles: ['super_admin', 'rh', 'director', 'gerente', 'administrativo', 'sindicalizado'],
  },
];
