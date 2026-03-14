import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "@services/api";

export function useUsers(params = {}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => (await userService.list(params)).data
  });
}

export function useUser(id) {
  return useQuery({
    queryKey: ["user", id],
    enabled: !!id,
    queryFn: async () => (await userService.detail(id)).data.data
  });
}

export function useCreateUser() {
  const cliente = useQueryClient();
  return useMutation({
    mutationFn: async (datos) => (await userService.create(datos)).data,
    onSuccess: () => cliente.invalidateQueries({ queryKey: ["users"] })
  });
}

export function useUpdateUser(id) {
  const cliente = useQueryClient();
  return useMutation({
    mutationFn: async (datos) => (await userService.update(id, datos)).data,
    onSuccess: () => {
      cliente.invalidateQueries({ queryKey: ["users"] });
      cliente.invalidateQueries({ queryKey: ["user", id] });
    }
  });
}
