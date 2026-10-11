import { useQuery } from "@tanstack/react-query";
import { expenseService } from "../../services/expense.service";

export function useProjectExpensesQuery(projectId) {
  return useQuery({
    queryKey: ["project-expenses", projectId],
    queryFn: () => expenseService.getProjectExpenses(projectId),
    enabled: !!projectId,
  });
}