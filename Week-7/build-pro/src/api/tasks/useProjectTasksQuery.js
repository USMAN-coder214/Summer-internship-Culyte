import { useQuery } from "@tanstack/react-query";
import { taskService } from "../../services/task.service";

export function useProjectTasksQuery(projectId) {
  return useQuery({
    queryKey: ["project-tasks", projectId],
    queryFn: () => taskService.getProjectTasks(projectId),
    enabled: !!projectId,
  });
}