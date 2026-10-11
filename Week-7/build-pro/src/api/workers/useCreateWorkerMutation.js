import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workerService } from "../../services/worker.service";

export function useCreateWorkerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => workerService.createWorker(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workers"],
      });
    },
  });
}