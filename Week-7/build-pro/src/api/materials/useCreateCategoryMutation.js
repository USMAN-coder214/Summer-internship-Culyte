import { useMutation } from "@tanstack/react-query";
import { materialService } from "../../services/material.service";

export function useCreateCategoryMutation() {
  return useMutation({
    mutationFn: (data) =>
      materialService.createCategory(data),
  });
}