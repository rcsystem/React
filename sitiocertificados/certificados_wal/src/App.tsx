// App.tsx o main.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginRfc } from "./pages/LoginRfc";
import { LoginClave } from "./pages/LoginClave";
import { AppHome } from "./pages/AppHome";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas con bloqueo de "atrás" */}
          <Route path="/login" element={<LoginRfc />} />
          <Route path="/login-clave" element={<LoginClave />} />

          {/* Rutas protegidas */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppHome />
              </ProtectedRoute>
            }
          />

          {/* Ruta por defecto */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
