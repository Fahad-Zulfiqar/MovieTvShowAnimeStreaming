import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

import type { MovieDetail } from "../Entities/MovieDetails";

const useMovieDetails = (id: string) => {
  const apiClient = new ApiClient<MovieDetail>("movie");
  return useQuery<MovieDetail, Error>({
    queryKey: ["movieDetails", id],
    queryFn: () => apiClient.get(id),
    staleTime: 2 * 24 * 60 * 60 * 1000,
  });
};

export default useMovieDetails;
