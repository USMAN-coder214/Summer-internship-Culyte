import { apiClient } from "../apiConfig/apiClient";

export const projectWorkerService = {
  // Assign worker to project
  assignWorker: async (data) => {
    const response = await apiClient.post(
      "/project-workers",
      data
    );

    return response.data;
  },

  // Get workers assigned to project
  getProjectWorkers: async (projectId) => {
    const response = await apiClient.get(
      `/project-workers/${projectId}`
    );

    return response.data;
  },
};