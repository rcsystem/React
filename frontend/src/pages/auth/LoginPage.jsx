import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoginForm from "@components/auth/LoginForm";
import { authService } from "@services/api";
import { useAuthStore } from "@store/authStore";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const guardarSesion = useAuthStore((estado) => estado.login);
  const [cargando, setCargando] = useState(false);

  const enviar = async (datos) => {
    try {
      setCargando(true);
      const respuesta = await authService.login(datos);
      guardarSesion(respuesta.data);
      toast.success("Bienvenido al sistema");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "No fue posible iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return <LoginForm onSubmit={enviar} loading={cargando} />;
}
