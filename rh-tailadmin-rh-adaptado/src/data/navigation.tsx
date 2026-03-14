import type { ReactNode } from "react";
import {
  CalenderIcon,
  GridIcon,
  ListIcon,
  PageIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons";
import type { Rol } from "../auth/AuthContext";

export type NavItem = {
  name: string;
  icon: ReactNode;
  path?: string;
  roles?: Rol[];
  subItems?: { name: string; path: string; roles?: Rol[] }[];
};

export const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Resumen RH", path: "/" }],
  },
  {
    icon: <PageIcon />,
    name: "Operación",
    subItems: [
      { name: "Permisos", path: "/permisos" },
      { name: "Autorizaciones", path: "/autorizaciones", roles: ["super_admin", "rh", "director", "gerente"] },
      { name: "Inasistencias", path: "/inasistencias", roles: ["super_admin", "rh", "director", "gerente"] },
    ],
  },
  {
    icon: <UserCircleIcon />,
    name: "Personal",
    subItems: [
      { name: "Usuarios", path: "/usuarios", roles: ["super_admin", "rh"] },
      { name: "Departamentos", path: "/departamentos", roles: ["super_admin", "rh"] },
      { name: "Puestos", path: "/puestos", roles: ["super_admin", "rh"] },
      { name: "Horarios", path: "/horarios", roles: ["super_admin", "rh"] },
      { name: "Carga Excel", path: "/importar-usuarios", roles: ["super_admin", "rh"] },
    ],
  },
  {
    icon: <TableIcon />,
    name: "Mi cuenta",
    subItems: [
      { name: "Mi perfil", path: "/mi-perfil" },
      { name: "Cambiar contraseña", path: "/cambiar-contrasena" },
    ],
  },
  {
    icon: <ListIcon />,
    name: "Configuración",
    subItems: [
      { name: "Reglas del sistema", path: "/configuracion", roles: ["super_admin", "rh"] },
    ],
  },
  {
    icon: <CalenderIcon />,
    name: "Calendario",
    path: "/calendar",
    roles: ["super_admin", "rh", "director", "gerente"],
  },
];

export const filtrarMenuPorRol = (items: NavItem[], rol: Rol) =>
  items
    .filter((item) => !item.roles || item.roles.includes(rol))
    .map((item) => ({
      ...item,
      subItems: item.subItems?.filter((sub) => !sub.roles || sub.roles.includes(rol)),
    }))
    .filter((item) => (item.subItems ? item.subItems.length > 0 : true));
