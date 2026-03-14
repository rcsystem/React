import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import Calendar from "./pages/Calendar";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ProtectedRoute from "./auth/ProtectedRoute";
import UsersPage from "./pages/Modules/Users";
import DepartmentsPage from "./pages/Modules/Departments";
import PositionsPage from "./pages/Modules/Positions";
import SchedulesPage from "./pages/Modules/Schedules";
import PermissionsPage from "./pages/Modules/Permissions";
import ApprovalsPage from "./pages/Modules/Approvals";
import AbsencesPage from "./pages/Modules/Absences";
import ImportUsersPage from "./pages/Modules/ImportUsers";
import SettingsPage from "./pages/Modules/Settings";
import MyProfilePage from "./pages/Profile/MyProfile";
import ChangePasswordPage from "./pages/Profile/ChangePassword";
import { AuthProvider } from "./auth/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/usuarios" element={<UsersPage />} />
              <Route path="/departamentos" element={<DepartmentsPage />} />
              <Route path="/puestos" element={<PositionsPage />} />
              <Route path="/horarios" element={<SchedulesPage />} />
              <Route path="/permisos" element={<PermissionsPage />} />
              <Route path="/autorizaciones" element={<ApprovalsPage />} />
              <Route path="/inasistencias" element={<AbsencesPage />} />
              <Route path="/importar-usuarios" element={<ImportUsersPage />} />
              <Route path="/configuracion" element={<SettingsPage />} />
              <Route path="/mi-perfil" element={<MyProfilePage />} />
              <Route path="/cambiar-contrasena" element={<ChangePasswordPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Navigate to="/signin" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
