import { Link } from "react-router-dom";
import PageHeader from "@components/shared/PageHeader";
import Button from "@components/ui/Button";
import Table from "@components/ui/Table";
import Spinner from "@components/shared/Spinner";
import { useVacationBalance, useVacations } from "@hooks/useVacations";

export default function VacationsListPage() {
  const { data, isLoading } = useVacations();
  const saldo = useVacationBalance();
  if (isLoading || saldo.isLoading) return <div className="flex justify-center py-10"><Spinner /></div>;

  const columnas = [
    { key: "id", title: "ID" },
    { key: "user", title: "Usuario", render: (fila) => fila.user?.name || "-" },
    { key: "start_date", title: "Inicio" },
    { key: "end_date", title: "Fin" },
    { key: "days", title: "Días" },
    { key: "status", title: "Estatus" }
  ];

  return (
    <div className="space-y-4">
      <PageHeader title="Vacaciones" description={`Saldo disponible: ${saldo.data?.available_days ?? 0} días`} actions={<Link to="/vacations/create"><Button>Solicitar vacaciones</Button></Link>} />
      <Table columns={columnas} rows={data || []} />
    </div>
  );
}
