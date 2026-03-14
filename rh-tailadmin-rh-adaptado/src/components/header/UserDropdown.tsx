import { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function cerrarSesion() {
    logout();
    navigate("/signin");
  }

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="dropdown-toggle flex items-center text-gray-700 dark:text-gray-400">
        <span className="mr-3 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-brand-500 font-semibold text-white">
          {usuario?.nombre.charAt(0)}
        </span>
        <span className="mr-1 block font-medium text-theme-sm">{usuario?.nombre.split(" ")[0]}</span>
        <svg className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""} stroke-gray-500 dark:stroke-gray-400`} width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.3125 8.65625L9 13.3437L13.6875 8.65625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <Dropdown isOpen={isOpen} onClose={closeDropdown} className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark">
        <div className="border-b border-gray-200 px-3 pb-3 dark:border-gray-800">
          <p className="font-semibold text-gray-800 dark:text-white/90">{usuario?.nombre}</p>
          <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{usuario?.correo}</p>
        </div>
        <ul className="flex flex-col gap-1 border-b border-gray-200 py-4 dark:border-gray-800">
          <li><DropdownItem onItemClick={closeDropdown} tag="a" to="/mi-perfil" className="group flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">Mi perfil</DropdownItem></li>
          <li><DropdownItem onItemClick={closeDropdown} tag="a" to="/cambiar-contrasena" className="group flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">Cambiar contraseña</DropdownItem></li>
        </ul>
        <Link to="/signin" onClick={cerrarSesion} className="group mt-3 flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">Cerrar sesión</Link>
      </Dropdown>
    </div>
  );
}
