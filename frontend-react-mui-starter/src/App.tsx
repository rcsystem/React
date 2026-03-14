import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './app/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { UsersPage } from './pages/users/UsersPage';
import { Box, Typography } from '@mui/material';

function Placeholder({ titulo }: { titulo: string }) {
  return (
    <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 4 }}>
      <Typography variant="h6">{titulo}</Typography>
      <Typography variant="body2" color="text.secondary">Módulo en construcción.</Typography>
    </Box>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/usuarios" element={<UsersPage />} />
                <Route path="/permisos" element={<Placeholder titulo="Permisos" />} />
                <Route path="/autorizaciones" element={<Placeholder titulo="Autorizaciones" />} />
                <Route path="/inasistencias" element={<Placeholder titulo="Inasistencias" />} />
                <Route path="/departamentos" element={<Placeholder titulo="Departamentos" />} />
                <Route path="/puestos" element={<Placeholder titulo="Puestos" />} />
                <Route path="/horarios" element={<Placeholder titulo="Horarios" />} />
                <Route path="/importacion" element={<Placeholder titulo="Carga Excel" />} />
                <Route path="/configuracion" element={<Placeholder titulo="Reglas del sistema" />} />
                <Route path="/perfil" element={<Placeholder titulo="Mi perfil" />} />
                <Route path="/cambiar-password" element={<Placeholder titulo="Cambiar contraseña" />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
