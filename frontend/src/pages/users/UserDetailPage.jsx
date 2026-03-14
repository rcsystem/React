import { Link, useParams } from "react-router-dom";
import PageHeader from "@components/shared/PageHeader";
import Card from "@components/ui/Card";
import Button from "@components/ui/Button";
import Spinner from "@components/shared/Spinner";
import { useUser } from "@hooks/useUsers";

export default function UserDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useUser(id);
  if (isLoading) return <div className="flex justify-center py-10"><Spinner /></div>;

  return (
    <div className="space-y-4">
      <PageHeader title="Detalle de usuario" description="Consulta del colaborador" actions={<Link to={`/users/${id}/edit`}><Button>Editar</Button></Link>} />
      <Card>
        <dl className="grid gap-4 md:grid-cols-2">
          <div><dt className="text-sm text-slate-500">Nombre</dt><dd className="font-medium">{data?.name}</dd></div>
          <div><dt className="text-sm text-slate-500">Correo</dt><dd className="font-medium">{data?.email}</dd></div>
          <div><dt className="text-sm text-slate-500">Nómina</dt><dd className="font-medium">{data?.employee_number}</dd></div>
          <div><dt className="text-sm text-slate-500">Tipo</dt><dd className="font-medium">{data?.employee_type}</dd></div>
        </dl>
      </Card>
    </div>
  );
}
