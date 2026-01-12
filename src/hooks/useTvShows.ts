import { useInfiniteQuery } from "@tanstack/react-query";
import ApiClient, { type FetchResponse } from "../services/api-client";
// import useGameQueryStore from "../store";
import { type TvShow } from "../Entities/TvShows";

const useTvShows = (category: string) => {
  const apiClient = new ApiClient<TvShow>(category);
  // const gameQuery = useGameQueryStore((s) => s.gameQuery);
  //   return useQuery<FetchResponse<Movies>, Error>({
  //     queryKey: ["movies", category],
  //     queryFn: () => apiClient.getAll(),
  //     staleTime: 10 * 60 * 1000,
  //   });
  return useInfiniteQuery<FetchResponse<TvShow>, Error>({
    queryKey: ["TvShows", category],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          page: pageParam,
        },
      }),
    initialPageParam: 1,
    staleTime: 2 * 24 * 60 * 60 * 1000,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
};

export default useTvShows;
