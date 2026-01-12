import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import type { Episode } from "../Entities/Episode";
// import type { SeasonEpisodes } from "../Entities/SeasonEpisodes";
import type { CurrentlyWatchingItem } from "../Entities/CurrentlyWatchingItem";

const useSeasonsEpisodes = (id: string, seasonNumber: number) => {
  const apiClient = new ApiClient<CurrentlyWatchingItem>("tv");

  return useQuery<Episode[], Error>({
    queryKey: ["season-episodes", id, seasonNumber],
    queryFn: () => apiClient.getSeasonEpisodes(id, seasonNumber),
    staleTime: 2 * 24 * 60 * 60 * 1000,
    enabled: !!id && seasonNumber > 0,
  });
};

export default useSeasonsEpisodes;
