// components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { usuario, token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Bloquear navegación hacia atrás en rutas protegidas
    if (usuario && token) {
      // 1. Reemplazar la entrada actual en el historial
      window.history.replaceState(null, '', window.location.href);
      
      // 2. Agregar una nueva entrada vacía para bloquear el "atrás"
      window.history.pushState(null, '', window.location.href);
      
      // 3. Escuchar intentos de navegación atrás
      const handlePopState = (event: PopStateEvent) => {
        // Prevenir el comportamiento por defecto
        event.preventDefault();
        
        // Reemplazar con la ruta actual
        window.history.replaceState(null, '', window.location.href);
        
        // Opcional: mostrar mensaje
        console.log('Navegación atrás bloqueada');
      };

      window.addEventListener('popstate', handlePopState);
      
      // 4. También bloquear recarga con F5/Ctrl+R
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = ''; // Mensaje por defecto del navegador
      };
      
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [usuario, token, navigate]);

  // Si no está autenticado, redirigir al login
  if (!usuario || !token) {
    // Limpiar historial para que no pueda volver atrás al login
    window.history.replaceState(null, '', '/login');
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}