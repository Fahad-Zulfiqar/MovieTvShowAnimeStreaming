import { useQuery } from "@tanstack/react-query";
import ApiClient, { type FetchResponse } from "../services/api-client";
import type { TvShow } from "../Entities/TvShows";

const useMovies = (search: string) => {
  const apiClient = new ApiClient<TvShow>("search/multi");
  return useQuery<FetchResponse<TvShow>, Error>({
    queryKey: ["query-search", search],
    queryFn: () => apiClient.getAll({ params: { query: search } }),
    staleTime: 2 * 24 * 60 * 60 * 1000,
  });
};

export default useMovies;
