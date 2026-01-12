import type { Genres } from "./Genres";
import type { Seasons } from "./Seasons";

export interface ShowDetail {
  genres: Genres[];
  seasons: Seasons[];
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  media_type?: string;
}
