import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
// import type { ShowDetail } from "../Entities/TvShowDetails";
import type { CurrentlyWatchingItem } from "../Entities/CurrentlyWatchingItem";

const useTvShowDetails = (id: string) => {
  const apiClient = new ApiClient<CurrentlyWatchingItem>("tv");
  return useQuery<CurrentlyWatchingItem, Error>({
    queryKey: ["tv-show-details", id],
    queryFn: () => apiClient.get(id),
    staleTime: 2 * 24 * 60 * 60 * 1000,
  });
};

export default useTvShowDetails;
