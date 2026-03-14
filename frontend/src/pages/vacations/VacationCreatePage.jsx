import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PageHeader from "@components/shared/PageHeader";
import Card from "@components/ui/Card";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { useCreateVacation } from "@hooks/useVacations";

export default function VacationCreatePage() {
  const navigate = useNavigate();
  const mutacion = useCreateVacation();
  const { register, handleSubmit } = useForm();

  const guardar = async (datos) => {
    try {
      await mutacion.mutateAsync(datos);
      toast.success("Solicitud de vacaciones enviada");
      navigate("/vacations");
    } catch (error) {
      toast.error(error?.response?.data?.message || "No fue posible enviar la solicitud");
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Solicitar vacaciones" description="Registro de días de descanso" />
      <Card>
        <form onSubmit={handleSubmit(guardar)} className="grid gap-4 md:grid-cols-2">
          <Input label="Fecha inicio" type="date" {...register("start_date")} />
          <Input label="Fecha fin" type="date" {...register("end_date")} />
          <Input label="Comentarios" {...register("comments")} />
          <div className="md:col-span-2"><Button type="submit" disabled={mutacion.isPending}>Enviar</Button></div>
        </form>
      </Card>
    </div>
  );
}
