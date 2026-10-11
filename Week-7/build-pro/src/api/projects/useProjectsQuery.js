import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../apiConfig/apiClient";

export function useProjectsQuery() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await apiClient.get("/projects");

      console.log("GET PROJECTS RESPONSE:", response.data);

      return response.data;
    },
  });
}