import { apiClient } from "../apiConfig/apiClient";

export const materialService = {
  createCategory: async (data) => {
    const response = await apiClient.post(
      "/material-categories",
      data
    );

    return response.data;
  },

  createMaterial: async (data) => {
    const response = await apiClient.post(
      "/materials",
      data
    );

    return response.data;
  },
};