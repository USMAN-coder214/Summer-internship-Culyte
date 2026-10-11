import { apiClient } from "../apiConfig/apiClient";

export const workerService = {
  // Get all workers
  getWorkers: async () => {
    const response = await apiClient.get("/workers");

    return response.data;
  },

  // Create a worker
  createWorker: async (data) => {
    const response = await apiClient.post(
      "/workers",
      data
    );

    return response.data;
  },
};