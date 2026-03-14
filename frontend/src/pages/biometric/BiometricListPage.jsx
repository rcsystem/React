import toast from "react-hot-toast";
import PageHeader from "@components/shared/PageHeader";
import Button from "@components/ui/Button";
import Spinner from "@components/shared/Spinner";
import BiometricTable from "@components/biometric/BiometricTable";
import { useBiometricRecords, useCheckin } from "@hooks/useBiometric";

export default function BiometricListPage() {
  const { data, isLoading } = useBiometricRecords();
  const mutacion = useCheckin();

  const registrar = async (type) => {
    try {
      await mutacion.mutateAsync({ type, source: "web" });
      toast.success("Checada registrada");
    } catch (error) {
      toast.error(error?.response?.data?.message || "No fue posible registrar la checada");
    }
  };

  if (isLoading) return <div className="flex justify-center py-10"><Spinner /></div>;

  return (
    <div className="space-y-4">
      <PageHeader title="Registros biométricos" description="Control de asistencia" actions={<div className="flex gap-2"><Button onClick={() => registrar("entry")}>Entrada</Button><Button variant="secondary" onClick={() => registrar("exit")}>Salida</Button></div>} />
      <BiometricTable rows={data?.data || []} />
    </div>
  );
}
