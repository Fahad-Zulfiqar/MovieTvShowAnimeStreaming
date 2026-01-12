import type { Episode } from "./Episode";
import type { Genres } from "./Genres";
import type { Seasons } from "./Seasons";

export interface CurrentlyWatchingItem {
  id: number;
  episodes?: Episode[];
  seasons: Seasons[];
  genres: Genres[];
  media_type?: string;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
}
