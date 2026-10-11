import { useMutation } from "@tanstack/react-query";
import { materialService } from "../../services/material.service";

export function useCreateMaterialMutation() {
  return useMutation({
    mutationFn: (data) =>
      materialService.createMaterial(data),
  });
}