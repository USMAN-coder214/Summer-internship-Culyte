import { apiClient } from "../apiConfig/apiClient";

export const projectService = {
  getProjectCostSummary: async (projectId) => {
    const response = await apiClient.get(
      `/projects/${projectId}/cost-summary`
    );

    return response.data;
  },

  getProjectDashboard: async (projectId) => {
    const response = await apiClient.get(
      `/projects/${projectId}/dashboard`
    );

    return response.data;
  },

  createProject: async (data) => {
    const response = await apiClient.post("/projects", data);

    return response.data;
  },
};

getProjects: async () => {
  const response = await apiClient.get("/projects");
  return response.data;
}