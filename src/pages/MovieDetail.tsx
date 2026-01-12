import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import useMovieDetails from "../hooks/useMovieDetails";
import useCast from "../hooks/useCast";
import HeroSectionLayout from "../components/TvShowLayoutSkeleton/HeroSectionLayout";
import CastSection from "../components/TvShowLayoutSkeleton/CastSection";
import { addMovieToCurrentlyWatching } from "../store/themeConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import type { MovieDetail } from "../Entities/MovieDetails";
import { usePostMovie } from "../hooks/usePostMovie";
import type { IRootState } from "../store";

// interface Genre {
//   id: number; // The unique identifier for the genre
//   name: string; // The name of the genre
// }

// interface Video {
//   key: string | undefined;
//   name: string;
// }

// interface VideosResult {
//   results: Video[];
// }

// interface MovieDetail {
//   genres: Genre[];
//   videos: VideosResult;
//   id: number;
//   original_title: string;
//   overview: string;
//   poster_path: string;
//   backdrop_path: string;
// }

// interface Cast {
//   original_name: string;
//   profile_path: string;
//   character: string;
// }

// interface Credit {
//   id: number;
//   cast: Cast[];
// }

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const Auth = useSelector((state: IRootState) => state.auth.userInfo);

  const { mutate: createMovie } = usePostMovie();
  // const [movDetail, setMovDetail] = useState<MovieDetail>();
  // const [movCast, setMovCast] = useState<Cast[]>([]);

  // const fetchMovieDetail = async () => {
  //   try {
  //     const res = await axios.get<MovieDetail>(
  //       `${baseUrl}movie/${id}?append_to_response=videos&api_key=${apiKey}`
  //     );
  //     setMovDetail(res.data);
  //   } catch (error) {
  //     console.error("Error fetching TV shows:", error);
  //   }
  // };

  const { data, isLoading } = useMovieDetails(id || "");
  // console.log(data);

  const { data: movCast, isLoading: castLoading } = useCast("movie", id || "");
  // console.log(movC)

  // console.log(movDetail);

  // Official Trailer
  const trailer = () => {
    const res = data?.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    return res?.key;
  };

  // console.log(trailer());

  // const fetchMovieCast = async () => {
  //   try {
  //     const res = await axios.get<Credit>(
  //       `${baseUrl}movie/${id}/credits?api_key=${apiKey}`
  //     );
  //     //   setMovCast(res.data.cast);
  //     setMovCast(res.data.cast.slice(0, 15));
  //   } catch (error) {
  //     console.error("Error fetching TV shows:", error);
  //   }
  // };

  // useEffect(() => {
  //   // fetchMovieDetail();
  //   fetchMovieCast();
  // }, []);

  const handleAddToCurrentlyWatching = (movie: MovieDetail) => {
    dispatch(addMovieToCurrentlyWatching(movie));

    const newEpisode = {
      user: Auth.id, // Make sure to have the user ID available
      // Assuming tvDetail contains the show ID
      movie_id: movie.id,
      original_title: movie.original_title,
      poster_path: movie.poster_path,
      media_type: movie.media_type,
    };

    // Call the mutation to create the episode
    createMovie(newEpisode);
  };

  return (
    <div className="relative">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6 rounded-md ">
        {isLoading ? (
          <HeroSectionLayout />
        ) : (
          <>
            <div className="panel h-full flex items-center justify-center">
              <div className="rounded-md overflow-hidden  ">
                <img
                  src={`https://image.tmdb.org/t/p/w200${data?.poster_path}`}
                  alt="..."
                />
              </div>
            </div>
            {/* second div */}
            <div className="panel h-full xl:col-span-2">
              <div className="relative">
                <h1 className="text-3xl mb-5 font-bold">
                  {data?.original_title}
                </h1>
                <Link
                  to={`/watch/movie/${data?.id}`}
                  className="btn dark:bg-[#1b2e4b] border-secondary w-28 mb-5 outline-none"
                  onClick={() => handleAddToCurrentlyWatching(data)}
                >
                  play
                </Link>
                <p>{data?.overview}</p>
                <div className="flex flex-wrap mt-5">
                  <h3 className="text-xl font-bold mr-2">Genres:</h3>
                  <ul className="flex flex-wrap">
                    {data?.genres.map((genre) => (
                      <li
                        key={genre.id}
                        className="bg-slate-700 text-white ml-2 mb-2 rounded-full px-3 py-1"
                      >
                        {genre.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* show movie trailer here  */}
      {trailer() && (
        <div className="panel mt-5 mb-5 ">
          <h2 className="font-semibold text-3xl dark:text-white mb-5 text-center">
            Official Trailer
          </h2>

          <div className=" w-full h-full rounded-xl overflow-hidden">
            <YouTube
              videoId={trailer()}
              opts={{
                width: "100%",
                height: "500",
                playerVars: {
                  // https://developers.google.com/youtube/player_parameters
                  autoplay: 0, // Auto-play the video
                },
              }}
            />
          </div>
        </div>
      )}

      <div className="panel">
        <div className="font-semibold text-3xl dark:text-white mb-5 text-center ">
          Cast
        </div>
        <div>
          <div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-2">
              {castLoading ? (
                <CastSection />
              ) : (
                <>
                  {movCast?.cast.map((item) => {
                    return (
                      <li key={item.original_name}>
                        <div className="bg-white dark:bg-[#1b2e4b] rounded-md overflow-hidden border border-white-light dark:border-dark  p-3 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center">
                          <div className="ltr:sm:mr-4 rtl:sm:ml-4 ">
                            <img
                              alt="avatar"
                              src={
                                item.profile_path
                                  ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                                  : "/assets/placeholder.png"
                              }
                              className="w-20 h-26 rounded-md overflow-hidden object-cover"
                            />
                          </div>
                          <div className="flex md:flex-row flex-col justify-between items-center flex-1 text-center md:text-left">
                            <div className="font-semibold md:my-0 my-3">
                              <div className="text-dark dark:text-[#bfc9d4] text-base">
                                {item.original_name}
                              </div>
                              <div className="text-white-dark text-xs">
                                {item.character}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
