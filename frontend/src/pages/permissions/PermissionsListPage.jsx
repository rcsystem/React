import { Link } from "react-router-dom";
import PageHeader from "@components/shared/PageHeader";
import Button from "@components/ui/Button";
import Table from "@components/ui/Table";
import Spinner from "@components/shared/Spinner";
import StatusBadge from "@components/permissions/StatusBadge";
import { usePermissions } from "@hooks/usePermissions";

export default function PermissionsListPage() {
  const { data, isLoading } = usePermissions();
  if (isLoading) return <div className="flex justify-center py-10"><Spinner /></div>;

  const filas = data?.data || [];
  const columnas = [
    { key: "id", title: "ID" },
    { key: "usuario", title: "Usuario", render: (fila) => fila.user?.name || "-" },
    { key: "type", title: "Tipo" },
    { key: "reason", title: "Motivo" },
    { key: "status", title: "Estatus", render: (fila) => <StatusBadge status={fila.status} /> },
    { key: "acciones", title: "Acciones", render: (fila) => <Link className="text-primary" to={`/permission-requests/${fila.id}`}>Ver</Link> }
  ];

  return (
    <div className="space-y-4">
      <PageHeader title="Permisos" description="Solicitudes laborales" actions={<Link to="/permission-requests/create"><Button>Nueva solicitud</Button></Link>} />
      <Table columns={columnas} rows={filas} />
    </div>
  );
}
