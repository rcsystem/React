import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { vacationService } from "@services/api";

export function useVacations() {
  return useQuery({
    queryKey: ["vacations"],
    queryFn: async () => (await vacationService.list()).data.data
  });
}

export function useVacationBalance() {
  return useQuery({
    queryKey: ["vacation-balance"],
    queryFn: async () => (await vacationService.balance()).data.data
  });
}

export function useCreateVacation() {
  const cliente = useQueryClient();
  return useMutation({
    mutationFn: async (datos) => (await vacationService.create(datos)).data,
    onSuccess: () => {
      cliente.invalidateQueries({ queryKey: ["vacations"] });
      cliente.invalidateQueries({ queryKey: ["vacation-balance"] });
    }
  });
}
