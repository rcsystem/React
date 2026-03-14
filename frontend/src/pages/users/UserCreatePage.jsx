import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageHeader from "@components/shared/PageHeader";
import Card from "@components/ui/Card";
import UserForm from "@components/users/UserForm";
import { useCreateUser } from "@hooks/useUsers";

export default function UserCreatePage() {
  const navigate = useNavigate();
  const mutacion = useCreateUser();

  const guardar = async (datos) => {
    try {
      await mutacion.mutateAsync({ ...datos, roles: [datos.employee_type] });
      toast.success("Usuario creado correctamente");
      navigate("/users");
    } catch (error) {
      toast.error(error?.response?.data?.message || "No fue posible crear el usuario");
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Nuevo usuario" description="Alta de personal" />
      <Card><UserForm onSubmit={guardar} loading={mutacion.isPending} /></Card>
    </div>
  );
}
