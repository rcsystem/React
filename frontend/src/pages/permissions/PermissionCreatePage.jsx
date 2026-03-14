import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageHeader from "@components/shared/PageHeader";
import Card from "@components/ui/Card";
import PermissionForm from "@components/permissions/PermissionForm";
import { useCreatePermission } from "@hooks/usePermissions";

export default function PermissionCreatePage() {
  const navigate = useNavigate();
  const mutacion = useCreatePermission();

  const guardar = async (datos) => {
    try {
      await mutacion.mutateAsync(datos);
      toast.success("Solicitud enviada");
      navigate("/permission-requests");
    } catch (error) {
      toast.error(error?.response?.data?.message || "No fue posible crear la solicitud");
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Nueva solicitud de permiso" description="Registro de permiso laboral" />
      <Card><PermissionForm onSubmit={guardar} loading={mutacion.isPending} /></Card>
    </div>
  );
}
