import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import PageHeader from "@components/shared/PageHeader";
import Card from "@components/ui/Card";
import Spinner from "@components/shared/Spinner";
import UserForm from "@components/users/UserForm";
import { useUser, useUpdateUser } from "@hooks/useUsers";

export default function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useUser(id);
  const mutacion = useUpdateUser(id);

  if (isLoading) return <div className="flex justify-center py-10"><Spinner /></div>;

  const guardar = async (datos) => {
    try {
      await mutacion.mutateAsync({ ...datos, roles: [datos.employee_type] });
      toast.success("Usuario actualizado");
      navigate(`/users/${id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "No fue posible actualizar");
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Editar usuario" description="Actualización de datos" />
      <Card><UserForm valoresIniciales={data} onSubmit={guardar} loading={mutacion.isPending} /></Card>
    </div>
  );
}
