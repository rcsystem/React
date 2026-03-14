import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "@layouts/AuthLayout";
import DashboardLayout from "@layouts/DashboardLayout";
import LoginPage from "@pages/auth/LoginPage";
import ForgotPasswordPage from "@pages/auth/ForgotPasswordPage";
import DashboardPage from "@pages/dashboard/DashboardPage";
import UsersListPage from "@pages/users/UsersListPage";
import UserCreatePage from "@pages/users/UserCreatePage";
import UserEditPage from "@pages/users/UserEditPage";
import UserDetailPage from "@pages/users/UserDetailPage";
import PermissionsListPage from "@pages/permissions/PermissionsListPage";
import PermissionCreatePage from "@pages/permissions/PermissionCreatePage";
import PermissionDetailPage from "@pages/permissions/PermissionDetailPage";
import VacationsListPage from "@pages/vacations/VacationsListPage";
import VacationCreatePage from "@pages/vacations/VacationCreatePage";
import BiometricListPage from "@pages/biometric/BiometricListPage";
import BiometricReportPage from "@pages/biometric/BiometricReportPage";
import NotFoundPage from "@pages/errors/NotFoundPage";
import UnauthorizedPage from "@pages/errors/UnauthorizedPage";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/", element: <LoginPage /> },
          { path: "/forgot-password", element: <ForgotPasswordPage /> }
        ]
      }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/users", element: <UsersListPage /> },
          { path: "/users/create", element: <UserCreatePage /> },
          { path: "/users/:id", element: <UserDetailPage /> },
          { path: "/users/:id/edit", element: <UserEditPage /> },
          { path: "/permission-requests", element: <PermissionsListPage /> },
          { path: "/permission-requests/create", element: <PermissionCreatePage /> },
          { path: "/permission-requests/:id", element: <PermissionDetailPage /> },
          { path: "/vacations", element: <VacationsListPage /> },
          { path: "/vacations/create", element: <VacationCreatePage /> },
          { path: "/biometric/records", element: <BiometricListPage /> },
          { path: "/biometric/report", element: <BiometricReportPage /> },
          { path: "/unauthorized", element: <UnauthorizedPage /> }
        ]
      }
    ]
  },
  { path: "*", element: <NotFoundPage /> }
]);
