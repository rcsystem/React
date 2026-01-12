import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginRfc } from "./pages/LoginRfc";
import { LoginClave } from "./pages/LoginClave";
import { AppHome } from "./pages/AppHome";
import { RutaProtegida } from "./auth/RutaProtegida";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginRfc />} />
        <Route path="/login-clave" element={<LoginClave />} />
        <Route
          path="/app"
          element={
            <RutaProtegida>
              <AppHome />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
