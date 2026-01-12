import { useQuery } from "@tanstack/react-query";
import ApiClient, { type FetchResponse } from "../services/api-client";
import type { MTV } from "../Entities/MTV";

const useDiscovery = (endpoints: string) => {
  const apiClient = new ApiClient<MTV>(endpoints);
  return useQuery<FetchResponse<MTV>, Error>({
    queryKey: ["dicvover-movies", endpoints],
    queryFn: () => apiClient.getAll({ params: { page: 1 } }),
    staleTime: 2 * 24 * 60 * 60 * 1000,
  });
};

export default useDiscovery;
