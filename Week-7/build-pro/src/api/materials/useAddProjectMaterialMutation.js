import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectMaterialService } from "../../services/projectMaterial.service";

export function useAddProjectMaterialMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      projectMaterialService.addMaterial(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-dashboard"],
      });
    },
  });
}