import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { permissionService } from "@services/api";

export function usePermissions() {
  return useQuery({
    queryKey: ["permission-requests"],
    queryFn: async () => (await permissionService.list()).data.data
  });
}

export function usePermission(id) {
  return useQuery({
    queryKey: ["permission-request", id],
    enabled: !!id,
    queryFn: async () => (await permissionService.detail(id)).data.data
  });
}

export function useCreatePermission() {
  const cliente = useQueryClient();
  return useMutation({
    mutationFn: async (datos) => (await permissionService.create(datos)).data,
    onSuccess: () => cliente.invalidateQueries({ queryKey: ["permission-requests"] })
  });
}
