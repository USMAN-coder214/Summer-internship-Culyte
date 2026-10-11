import { useQuery } from "@tanstack/react-query";
import { projectService } from "../../services/project.service";

export function useProjectDashboardQuery(projectId) {
  return useQuery({
    queryKey: ["project-dashboard", projectId],
    queryFn: () => projectService.getProjectDashboard(projectId),
    enabled: !!projectId,
  });
}