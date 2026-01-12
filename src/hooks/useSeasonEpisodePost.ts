// hooks/useSeasonEpisode.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Episode } from "../Entities/Episode"; // Adjust the import based on your file structure

const SEASON_EPISODE_URL = "/api/card/show"; // Adjust the URL based on your API

const useSeasonEpisodePost = () => {
  const queryClient = useQueryClient();

  return useMutation<Episode, Error, Episode>({
    mutationFn: (data: Episode) =>
      axios.post<Episode>(SEASON_EPISODE_URL, data).then((res) => res.data),
    onSuccess: (data) => {
      // Handle successful episode creation
      console.log("Episode created successfully:", data);

      // Optionally, you can invalidate queries related to episodes or perform other actions
      queryClient.invalidateQueries({ queryKey: ["episodes"] });
    },
    onError: (error) => {
      // Handle error, e.g., show a notification
      console.error("Episode creation failed:", error);
    },
  });
};

export { useSeasonEpisodePost };
