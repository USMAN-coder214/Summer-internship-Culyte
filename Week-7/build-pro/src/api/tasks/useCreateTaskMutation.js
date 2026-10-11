import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../../services/task.service";

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => taskService.createTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["project-dashboard"],
      });
    },
  });
}