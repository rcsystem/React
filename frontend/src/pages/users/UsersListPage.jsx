import { Link } from "react-router-dom";
import PageHeader from "@components/shared/PageHeader";
import Button from "@components/ui/Button";
import Table from "@components/ui/Table";
import Spinner from "@components/shared/Spinner";
import { useUsers } from "@hooks/useUsers";

export default function UsersListPage() {
  const { data, isLoading } = useUsers();
  if (isLoading) return <div className="flex justify-center py-10"><Spinner /></div>;

  const filas = data?.data || [];
  const columnas = [
    { key: "id", title: "ID" },
    { key: "name", title: "Nombre" },
    { key: "email", title: "Correo" },
    { key: "employee_type", title: "Tipo" },
    { key: "roles", title: "Roles", render: (fila) => fila.roles?.join(", ") || "-" },
    { key: "acciones", title: "Acciones", render: (fila) => <Link className="text-primary" to={`/users/${fila.id}`}>Ver</Link> }
  ];

  return (
    <div className="space-y-4">
      <PageHeader title="Usuarios" description="Gestión de usuarios del sistema" actions={<Link to="/users/create"><Button>Nuevo usuario</Button></Link>} />
      <Table columns={columnas} rows={filas} />
    </div>
  );
}
