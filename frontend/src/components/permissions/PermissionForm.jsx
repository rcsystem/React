import { useForm } from "react-hook-form";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import Button from "@components/ui/Button";

export default function PermissionForm({ onSubmit, loading = false }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { type: "personal", reason: "", starts_at: "", ends_at: "" }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <Select label="Tipo" {...register("type")}>
        <option value="personal">Personal</option>
        <option value="medico">Médico</option>
        <option value="sin_goce">Sin goce</option>
      </Select>
      <Input label="Motivo" {...register("reason")} />
      <Input label="Inicio" type="datetime-local" {...register("starts_at")} />
      <Input label="Fin" type="datetime-local" {...register("ends_at")} />
      <div className="md:col-span-2"><Button type="submit" disabled={loading}>{loading ? "Enviando..." : "Solicitar permiso"}</Button></div>
    </form>
  );
}
