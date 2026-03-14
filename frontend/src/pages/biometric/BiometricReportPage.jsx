import PageHeader from "@components/shared/PageHeader";
import Table from "@components/ui/Table";
import Spinner from "@components/shared/Spinner";
import { useBiometricReport } from "@hooks/useBiometric";

export default function BiometricReportPage() {
  const { data, isLoading } = useBiometricReport();
  if (isLoading) return <div className="flex justify-center py-10"><Spinner /></div>;

  return (
    <div className="space-y-4">
      <PageHeader title="Reporte biométrico" description="Concentrado de registros por usuario y tipo" />
      <Table columns={[{ key: "user_id", title: "Usuario" }, { key: "type", title: "Tipo" }, { key: "total", title: "Total" }]} rows={data || []} />
    </div>
  );
}
