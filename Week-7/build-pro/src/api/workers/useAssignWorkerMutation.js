import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectWorkerService } from "../../services/projectWorker.service";

export function useAssignWorkerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      projectWorkerService.assignWorker(data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project-workers", variables.projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["project-dashboard"],
      });
    },
  });
}