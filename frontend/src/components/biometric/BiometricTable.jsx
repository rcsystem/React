import Table from "@components/ui/Table";

export default function BiometricTable({ rows = [] }) {
  const columnas = [
    { key: "id", title: "ID" },
    { key: "usuario", title: "Usuario", render: (fila) => fila.user?.name || "-" },
    { key: "type", title: "Tipo" },
    { key: "recorded_at", title: "Fecha" },
    { key: "source", title: "Origen" }
  ];

  return <Table columns={columnas} rows={rows} />;
}
