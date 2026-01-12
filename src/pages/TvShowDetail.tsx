import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseImage } from "../constants";
import useCast from "../hooks/useCast";
import useSeasonsEpisodes from "../hooks/useSeasonsEpisodes";
import useTvShowDetails from "../hooks/useTvShowDetails";
import { addToCurrentlyWatching } from "../store/themeConfigSlice";
import { useDispatch, useSelector } from "react-redux";
// import type { ShowDetail } from "../Entities/TvShowDetails";
// import type { CurrentlyWatchingItem } from "../Entities/CurrentlyWatchingItem";
import type { Episode } from "../Entities/Episode";
import { useSeasonEpisodePost } from "../hooks/useSeasonEpisodePost";
// import TvShowLayoutContainer from "../components/TvShowLayoutSkeleton/TvShowLayoutContainer";
import HeroSectionLayout from "../components/TvShowLayoutSkeleton/HeroSectionLayout";
import SeasonsEpisodesSkeleton from "../components/TvShowLayoutSkeleton/SESectionSkeleton";
import CastSection from "../components/TvShowLayoutSkeleton/CastSection";
import type { IRootState } from "../store";

const TvShowDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  // const [movDetail, setMovDetail] = useState<ShowDetail>();
  // const [tvCast, setTvCast] = useState<Cast[]>([]);
  // const [seasonEpisodes, setSeasonEpisodes] = useState<Episode[]>();
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  // const [tvSeasons, setTvSeasons]=useState<Seasons[]>([])

  // const fetchMovieDetail = async () => {
  //   try {
  //     const res = await axios.get<ShowDetail>(
  //       `${baseUrl}tv/${id}?api_key=${apiKey}`
  //     );
  //     setMovDetail(res.data);
  //   } catch (error) {
  //     console.error("Error fetching TV shows:", error);
  //   }
  // };

  const Auth = useSelector((state: IRootState) => state.auth.userInfo);

  const { mutate: createEpisode } = useSeasonEpisodePost();

  const { data: tvDetail, isLoading } = useTvShowDetails(id || "");
  const { data: seasonEpisodes, isLoading: ifLoading } = useSeasonsEpisodes(
    id || "",
    selectedSeason
  );
  // console.log(seasonEpisodes?.map(epi=> epi.));
  const { data: tvCast, isLoading: tvLoading } = useCast("tv", id || "");

  const handleAddToCurrentlyWatching = (show: Episode) => {
    dispatch(addToCurrentlyWatching(show)); // Dispatch the action with the movie details

    if (tvDetail?.id === undefined) {
      console.error("Show ID is undefined");
      return; // Exit the function if show_id is not available
    }

    // Prepare the episode data for the mutation
    const newEpisode = {
      user: Auth.id, // Make sure to have the user ID available
      show_id: tvDetail.id, // Assuming tvDetail contains the show ID
      episode_number: show.episode_number,
      season_number: selectedSeason, // Assuming selectedSeason is the current season number
      name: show.name,
      still_path: show.still_path,
    };

    // Call the mutation to create the episode
    createEpisode(newEpisode);
  };

  // console.log(data);

  // const fetchSeasonEpisodes = async (seasonNumber: number) => {
  //   try {
  //     const res = await axios.get<SeasonEpisodes>(
  //       `${baseUrl}tv/${id}/season/${seasonNumber}?api_key=${apiKey}`
  //     );
  //     // setSeasonEpisodes(res.data.episodes); // Display first 5 episodes
  //     setSelectedSeason(seasonNumber); // Set the selected season
  //   } catch (error) {
  //     console.error("Error fetching season episodes:", error);
  //   }
  // };

  // const fetchTvCast = async () => {
  //   try {
  //     const res = await axios.get<Credit>(
  //       `${baseUrl}tv/${id}/credits?api_key=${apiKey}`
  //     );
  //     //   setMovCast(res.data.cast);
  //     setTvCast(res.data.cast.slice(0, 15));
  //   } catch (error) {
  //     console.error("Error fetching TV shows:", error);
  //   }
  // };

  // useEffect(() => {
  //   // fetchMovieDetail();
  //   // fetchTvCast();
  //   fetchSeasonEpisodes(1);
  // }, [id]);

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
                  src={`https://image.tmdb.org/t/p/w200${tvDetail?.poster_path}`}
                  alt="..."
                  className="w-full h-auto"
                />
              </div>
            </div>
            {/* second div */}
            <div className="panel h-full xl:col-span-2">
              <div className="relative">
                <h1 className="text-3xl mb-5 font-bold">{tvDetail?.name}</h1>
                <Link
                  to={`/watch/tv/${tvDetail?.id}/1/1`}
                  className="btn border-secondary dark:bg-[#1b2e4b] w-28 mb-5 outline-none"
                  // onClick={() => handleAddToCurrentlyWatching(tvDetail)}
                >
                  play
                </Link>
                <p>{tvDetail?.overview}</p>
                <div className="flex flex-wrap mt-5">
                  <h3 className="text-xl font-bold mr-2">Genres:</h3>
                  <ul className="flex flex-wrap">
                    {tvDetail?.genres.map((genre) => (
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
        {/* first div */}
      </div>

      {/* show seasons button */}

      <div className="panel mt-5 mb-5">
        {ifLoading ? (
          <SeasonsEpisodesSkeleton />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Seasons</h2>
            <div className="flex flex-wrap">
              {tvDetail?.seasons
                .filter(
                  (season) =>
                    !season.name.startsWith("Specials") &&
                    season.episode_count > 0
                )
                .map((season) => (
                  <button
                    key={season.season_number}
                    onClick={() => setSelectedSeason(season.season_number)}
                    className="btn border-secondary dark:bg-[rgb(27,46,75)] w-28 mb-2 mr-2"
                  >
                    Season {season.season_number}
                  </button>
                ))}
            </div>
            {/* show episodes here  */}
            {selectedSeason !== null && (
              <div className="mt-5">
                <h3 className="text-xl font-bold mb-2">Episodes</h3>
                <div className="flex overflow-x-auto space-x-2 whitespace-nowrap scrollbar-hidden">
                  {seasonEpisodes?.map((episode) => (
                    <div
                      key={episode.episode_number}
                      className="min-w-[150px] border border-[#ebedf2] dark:border-[#191e3a] rounded-md bg-white dark:bg-black shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),_0px_12px_24px_-4px_rgba(145,158,171,0.12)]"
                      onClick={() => handleAddToCurrentlyWatching(episode)}
                    >
                      <div className="rounded-md overflow-hidden shadow-[0_6px_10px_0_rgba(0,0,0,0.14),_0_1px_18px_0_rgba(0,0,0,0.12),_0_3px_5px_-1px_rgba(0,0,0,0.20)]  relative group">
                        <Link
                          to={`/watch/tv/${tvDetail?.id}/${selectedSeason}/${episode.episode_number}`}
                        >
                          <img
                            src={`${baseImage}${episode?.still_path}`}
                            alt={episode.name}
                            className="object-cover h-32 w-full"
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="text-center">
                              <div className="text-lg font-bold">
                                {episode.episode_number}
                              </div>
                              <div className="text-sm truncate w-36">
                                {episode.name}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Cast */}
      <div className="panel">
        <div className="font-semibold text-3xl dark:text-white mb-5 text-center ">
          Cast
        </div>
        <div>
          <div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-2">
              {tvLoading ? (
                <CastSection />
              ) : (
                <>
                  {tvCast?.cast.map((item) => {
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

export default TvShowDetail;
