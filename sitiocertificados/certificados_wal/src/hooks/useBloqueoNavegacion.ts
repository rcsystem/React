// hooks/useBloqueoNavegacion.ts
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useBloqueoNavegacion() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 1. Prevenir navegación con el botón "atrás" del navegador
    const bloquearAtras = () => {
      // Agregar una nueva entrada al historial cuando se entre a una ruta protegida
      window.history.pushState(null, '', window.location.href);
    };

    // 2. Solo aplicar en rutas protegidas (no en login)
    const rutasProtegidas = ['/app', '/dashboard', '/perfil'];
    const esRutaProtegida = rutasProtegidas.some(ruta => 
      location.pathname.startsWith(ruta)
    );

    if (esRutaProtegida) {
      // Agregar estado inicial
      window.history.pushState(null, '', window.location.href);
      
      // Escuchar eventos de popstate (cuando se presiona atrás/adelante)
      window.addEventListener('popstate', bloquearAtras);
      
      // Bloquear también con beforeunload
      window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        e.returnValue = '¿Estás seguro de que quieres salir?';
      });
    }

    // Limpieza
    return () => {
      window.removeEventListener('popstate', bloquearAtras);
      window.removeEventListener('beforeunload', () => {});
    };
  }, [location, navigate]);
}