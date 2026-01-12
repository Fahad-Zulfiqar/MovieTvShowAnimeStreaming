import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import type { Credits } from "../Entities/Credits";

const useCast = (type: string, id: string) => {
  const apiClient = new ApiClient<Credits>(type);
  return useQuery<Credits, Error>({
    queryKey: ["cast", id],
    queryFn: () => apiClient.get(`${id}/credits`),
    staleTime: 2 * 24 * 60 * 60 * 1000,
  });
};

export default useCast;
