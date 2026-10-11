import { apiClient } from "../apiConfig/apiClient";

export const taskService = {
  getProjectTasks: async (projectId) => {
    const response = await apiClient.get(
      `/tasks/project/${projectId}`
    );

    return response.data;
  },

  createTask: async (data) => {
    const response = await apiClient.post(
      "/tasks",
      data
    );

    return response.data;
  },
};