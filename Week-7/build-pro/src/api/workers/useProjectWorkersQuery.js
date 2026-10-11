import { useQuery } from "@tanstack/react-query";
import { projectWorkerService } from "../../services/projectWorker.service";

export function useProjectWorkersQuery(projectId) {
  return useQuery({
    queryKey: ["project-workers", projectId],
    queryFn: () => projectWorkerService.getProjectWorkers(projectId),
    enabled: !!projectId,
  });
}