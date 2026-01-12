import type { Genres } from "./Genres";
import type { VideosResult } from "./Trailer";

export interface MovieDetail {
  genres: Genres[];
  videos: VideosResult;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  media_type?: string;
}
