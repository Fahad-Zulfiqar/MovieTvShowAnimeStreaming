export interface Episode {
  show_id?: number;
  episode_number?: number;
  season_number?: number;
  name?: string;
  id?: number;
  movie_id?: number; // Ensure this property is included
  original_title?: string;
  still_path?: string;
  poster_path?: string;
  media_type?: string;
  user?: any; // Optional property for the image path
}
