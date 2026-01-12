// hooks/useSeasonEpisode.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Episode } from "../Entities/Episode"; // Adjust the import based on your file structure

const SEASON_EPISODE_URL = "/api/card/movie"; // Adjust the URL based on your API

const usePostMovie = () => {
  const queryClient = useQueryClient();

  return useMutation<Episode, Error, Episode>({
    mutationFn: (data: Episode) =>
      axios.post<Episode>(SEASON_EPISODE_URL, data).then((res) => res.data),
    onSuccess: (data) => {
      // Handle successful episode creation
      console.log("Episode created successfully:", data);

      // Optionally, you can invalidate queries related to episodes or perform other actions
      queryClient.invalidateQueries({ queryKey: ["movie"] });
    },
    onError: (error) => {
      // Handle error, e.g., show a notification
      console.error(error);
    },
  });
};

export { usePostMovie };
