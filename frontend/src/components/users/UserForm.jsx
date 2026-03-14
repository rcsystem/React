import { useForm } from "react-hook-form";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import Button from "@components/ui/Button";

export default function UserForm({ valoresIniciales = {}, onSubmit, loading = false }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: valoresIniciales.name || "",
      email: valoresIniciales.email || "",
      employee_number: valoresIniciales.employee_number || "",
      employee_type: valoresIniciales.employee_type || "administrativo",
      hire_date: valoresIniciales.hire_date || "",
      password: ""
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <Input label="Nombre" {...register("name")} />
      <Input label="Correo" type="email" {...register("email")} />
      <Input label="Nómina" {...register("employee_number")} />
      <Select label="Tipo de empleado" {...register("employee_type")}>
        <option value="administrativo">Administrativo</option>
        <option value="sindicalizado">Sindicalizado</option>
      </Select>
      <Input label="Fecha de ingreso" type="date" {...register("hire_date")} />
      <Input label="Contraseña" type="password" {...register("password")} />
      <div className="md:col-span-2"><Button type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar usuario"}</Button></div>
    </form>
  );
}
