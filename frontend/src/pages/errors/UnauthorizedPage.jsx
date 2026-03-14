import PageHeader from "@components/shared/PageHeader";

export default function UnauthorizedPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="UnauthorizedPage" description="No tienes permisos para acceder" />
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-slate-600">Pantalla base lista para extender.</p>
      </div>
    </div>
  );
}
