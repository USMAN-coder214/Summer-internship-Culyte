import { apiClient } from "../apiConfig/apiClient";

export const authService = {
  login: async (data) => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  signup: async (data) => {
    const response = await apiClient.post("/auth/signup", data);
    return response.data;
  },
};