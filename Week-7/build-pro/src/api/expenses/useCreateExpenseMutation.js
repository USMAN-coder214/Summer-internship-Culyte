import { useMutation, useQueryClient } from "@tanstack/react-query";
import { expenseService } from "../../services/expense.service";

export function useCreateExpenseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => expenseService.createExpense(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-expenses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["project-dashboard"],
      });
    },
  });
}