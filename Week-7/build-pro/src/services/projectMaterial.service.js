import { apiClient } from "../apiConfig/apiClient";

export const projectMaterialService = {
  addMaterial: async (data) => {
    const response = await apiClient.post(
      "/project-materials",
      data
    );

    return response.data;
  },
};