import { useParams } from "react-router-dom";
import PageHeader from "@components/shared/PageHeader";
import Card from "@components/ui/Card";
import Spinner from "@components/shared/Spinner";
import StatusBadge from "@components/permissions/StatusBadge";
import { usePermission } from "@hooks/usePermissions";

export default function PermissionDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = usePermission(id);
  if (isLoading) return <div className="flex justify-center py-10"><Spinner /></div>;

  return (
    <div className="space-y-4">
      <PageHeader title="Detalle de permiso" description="Seguimiento de solicitud" />
      <Card>
        <dl className="grid gap-4 md:grid-cols-2">
          <div><dt className="text-sm text-slate-500">Usuario</dt><dd className="font-medium">{data?.user?.name}</dd></div>
          <div><dt className="text-sm text-slate-500">Estatus</dt><dd className="font-medium"><StatusBadge status={data?.status} /></dd></div>
          <div><dt className="text-sm text-slate-500">Tipo</dt><dd className="font-medium">{data?.type}</dd></div>
          <div><dt className="text-sm text-slate-500">Motivo</dt><dd className="font-medium">{data?.reason}</dd></div>
        </dl>
      </Card>
    </div>
  );
}
