import { apiClient } from "../apiConfig/apiClient";

export const expenseService = {
  getProjectExpenses: async (projectId) => {
    const response = await apiClient.get(
      `/expenses/project/${projectId}`
    );

    return response.data;
  },

  createExpense: async (data) => {
    const response = await apiClient.post(
      "/expenses",
      data
    );

    return response.data;
  },
};