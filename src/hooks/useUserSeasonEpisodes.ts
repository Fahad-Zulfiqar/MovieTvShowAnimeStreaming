import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Episode } from "../Entities/Episode"; // Adjust the import based on your file structure

const SEASON_EPISODE_URL = "/api/card/user/"; // Adjust the URL based on your API

const useUserSeasonEpisodes = (userId: string) => {
  return useQuery<Episode[], Error>({
    queryKey: ["userEpisodes&movies", userId], // Unique key for the query
    queryFn: async () => {
      const response = await axios.get<Episode[]>(
        `${SEASON_EPISODE_URL}${userId}`
      ); // Use query parameter for userId
      return response.data;
    },
    // Optional: Set stale time if needed
  });
};

export { useUserSeasonEpisodes };
