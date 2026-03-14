import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { biometricService } from "@services/api";

export function useBiometricRecords() {
  return useQuery({
    queryKey: ["biometric-records"],
    queryFn: async () => (await biometricService.records()).data.data
  });
}

export function useBiometricReport() {
  return useQuery({
    queryKey: ["biometric-report"],
    queryFn: async () => (await biometricService.report()).data.data
  });
}

export function useCheckin() {
  const cliente = useQueryClient();
  return useMutation({
    mutationFn: async (datos) => (await biometricService.checkin(datos)).data,
    onSuccess: () => {
      cliente.invalidateQueries({ queryKey: ["biometric-records"] });
      cliente.invalidateQueries({ queryKey: ["biometric-report"] });
    }
  });
}
