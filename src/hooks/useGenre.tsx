import { useQuery } from "@tanstack/react-query";
import ApiClient, { type FetchResponse } from "../services/api-client";
import { type Movies } from "../Entities/Movies";

const useGenre = (genre_id: number) => {
  const apiClient = new ApiClient<Movies>(`genre/${genre_id}/movies`);
  return useQuery<FetchResponse<Movies>, Error>({
    queryKey: ["dicvover-movies", genre_id],
    queryFn: () => apiClient.getAll({ params: { page: 1 } }),
    staleTime: 2 * 24 * 60 * 60 * 1000,
  });
};

export default useGenre;
