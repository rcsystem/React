import Card from "@components/ui/Card";
import PageHeader from "@components/shared/PageHeader";
import Spinner from "@components/shared/Spinner";
import { useDashboard } from "@hooks/useDashboard";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();
  if (isLoading) return <div className="flex justify-center py-10"><Spinner /></div>;

  const tarjetas = [
    ["Usuarios", data?.users],
    ["Permisos pendientes", data?.permission_requests_pending],
    ["Vacaciones activas", data?.vacations_active],
    ["Checadas hoy", data?.biometric_today]
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Resumen general del sistema" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {tarjetas.map(([titulo, valor]) => (
          <Card key={titulo}>
            <p className="text-sm text-slate-500">{titulo}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{valor ?? 0}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
