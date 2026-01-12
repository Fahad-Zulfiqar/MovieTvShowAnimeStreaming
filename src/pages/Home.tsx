import { Link } from "react-router-dom";
import { baseImage } from "../constants";
import useDiscovery from "../hooks/useDiscovery";
import useGenre from "../hooks/useGenre";
import CardContainer from "../components/CardContainer";
import CardSkeleton from "../components/CardSkeleton";
import SwiperSlider from "../components/SwiperSlider";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCurrentlyWatching } from "../store/themeConfigSlice";
// import { useSelector } from "react-redux";
// import { addWatchedEpisode } from "../store/watchEpisodeSlice";
import type { IRootState } from "../store";
// import type { CurrentlyWatchingItem } from "../Entities/CurrentlyWatchingItem";
// import type { MTV } from "../Entities/MTV";
// import type { TvShow } from "../Entities/TvShows";
// import type { CurrentlyWatchingItem } from "../Entities/CurrentlyWatchingItem";
import Dropdown from "../components/Dropdown";
// import type { ShowDetail } from "../Entities/TvShowDetails";
// import type { CurrentlyWatchingItem } from "../Entities/CurrentlyWatchingItem";
import type { Episode } from "../Entities/Episode";
// import type { TvShow } from "../Entities/TvShows";
// import type { MTV } from "../Entities/MTV";

const CurrentlyWatching = ({
  currentlyWatching,
}: {
  currentlyWatching: Episode[];
}) => {
  const dispatch = useDispatch();
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;
  // const watchedEpisodes = useSelector((state: IRootState) => state.watchConfig);

  const handleDeleteItem = (showId: number) => {
    console.log(`Deleting item for show ID: ${showId}`); // Debugging line
    dispatch(removeFromCurrentlyWatching(showId)); // Update to remove by showId
  };

  // const handleAddToCurrentlyWatching = (show: Episode) => {
  //   dispatch(addToCurrentlyWatching(show)); // Dispatch the action with the episode details
  // };

  // const handleMarkAsWatched = (item: Episode) => {
  //   if (!watchedEpisodes.includes(item.episode_number)) {
  //     dispatch(addWatchedEpisode(item.episode_number)); // Add to watched episodes
  //     handleDeleteItem(item.episode_number); // Remove from currently watching
  //   }
  // };

  console.log("currently watching:", currentlyWatching);

  // if (currentlyWatching.length === 0) {
  //   return <p>No currently watching items.</p>;
  // }

  return (
    <div className="flex overflow-x-auto space-x-2 whitespace-nowrap scrollbar-hidden mt-5">
      <div className="flex flex-wrap gap-2">
        {currentlyWatching.map((item) => (
          <>
            <div
              key={`${item.show_id}-${item.episode_number}`} // Use a combination of show_id and episode_number for uniqueness
              className="relative border border-[#ebedf2] dark:border-[#191e3a] rounded-md bg-white dark:bg-black shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),_0px_12px_24px_-4px_rgba(145,158,171,0.12)] min-w-[150px] max-w-[200px]"
            >
              <div className="rounded-md overflow-hidden shadow-[0_6px_10px_0_rgba(0,0,0,0.14),_0_1px_18px_0_rgba(0,0,0,0.12),_0_3px_5px_-1px_rgba(0,0,0,0.20)]">
                <Link
                  to={
                    item.season_number
                      ? `/watch/tv/${item.show_id}/${item.season_number}/${item.episode_number}`
                      : `/watch/movie/${item?.id}`
                  }

                  // onClick={() => {
                  //   // Check if the episode is already in currently watching
                  //   const isCurrentlyWatching = currentlyWatching.some(
                  //     (ep) =>
                  //       ep.show_id === item.show_id &&
                  //       ep.episode_number === item.episode_number
                  //   );

                  //   if (!isCurrentlyWatching) {
                  //     handleAddToCurrentlyWatching(item); // Add to currently watching if not present
                  //   }

                  //   // Remove the previous episode when navigating to the next one
                  // }}
                >
                  <img
                    src={
                      item.still_path
                        ? `${baseImage}${item.still_path}`
                        : item.media_type !== "tv"
                        ? `${baseImage}${item.poster_path}` // Assuming episodes have an image property
                        : "/assets/placeholder.png"
                    }
                    alt={item.name}
                    className="object-cover h-40 w-full"
                  />
                  {/* <div className="absolute bottom-0 left-0 right-0 h-7 bg-black opacity-60 z-[998] shadow-[0px_-4px_10px_0px_rgba(0,0,0,1)]"></div> */}
                  <div className="flex space-x-16 absolute bottom-1 ">
                    <p className="  text-xs bg-dark rounded text-white px-1  ltr:ml-2 rtl:ml-2">
                      {item.name && item.name.length > 0
                        ? item.name.length > 6
                          ? `${item.name.slice(0, 10)}...`
                          : item.name
                        : item.media_type !== "tv"
                        ? item.original_title && item.original_title.length > 0
                          ? item.original_title.length > 6
                            ? `${item.original_title.slice(0, 10)}...`
                            : item.original_title
                          : "Unknown Title"
                        : "Unknown Title"}
                    </p>
                    {item.season_number && (
                      <p className=" text-xs bg-dark rounded text-success px-1  ltr:ml-2 rtl:ml-2">
                        {`S${item.season_number}E${item.episode_number}`}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
              <div className="dropdown absolute top-4 right-0  ">
                <Dropdown
                  placement="bottom-start"
                  btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black dark:text-white-dark hover:text-primary dark:hover:text-primary"
                  button={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="rotate-90 opacity-70 cursor-pointer "
                    >
                      <circle
                        cx="5"
                        cy="12"
                        r="2"
                        stroke="#FF0000"
                        strokeWidth="1.5"
                      />
                      <circle
                        opacity="0.5"
                        cx="12"
                        cy="12"
                        r="2"
                        stroke="#FF0000"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="19"
                        cy="12"
                        r="2"
                        stroke="#FF0000"
                        strokeWidth="1.5"
                      />
                    </svg>
                  }
                >
                  <ul className="!min-w-[170px] ">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  // const dispatch = useDispatch();
  const { data: NowPlayingMovies, isLoading: loading1 } =
    useDiscovery("movie/popular");
  const { data: sci_fic, isLoading: loading2 } = useGenre(878);
  const { data: animation, isLoading: loading3 } = useGenre(16);
  const { data: Horror, isLoading: loading4 } = useGenre(27);
  const { data: NowAiringTvShows, isLoading: loading5 } =
    useDiscovery("tv/top_rated");

  // console.log(NowAiringTvShows?.results.filter((now) => now.media_type));
  // console.log(NowAiringTvShows);

  // Access currently watching items from Redux store
  const currentlyWatching = useSelector(
    (state: IRootState) => state.themeConfig.currentlyWatching
  );

  const skeletons = [1, 2, 3, 4, 5, 6];

  // const handleAddToCurrentlyWatching = (show) => {
  //   dispatch(addToCurrentlyWatching(show)); // Dispatch the action with the movie details
  // };

  return (
    <div>
      <SwiperSlider />
      <div>
        {currentlyWatching.length > 0 && (
          <>
            <h2 className="text-2xl mb-5">
              Continue Watching
              <span className="text-xs bg-success-light rounded text-dark px-1  ltr:ml-2 rtl:ml-2 inline-block">
                On
              </span>
            </h2>
            <CurrentlyWatching currentlyWatching={currentlyWatching} />
          </>
        )}
      </div>

      <div className="mt-5">
        <h2 className="text-2xl mb-5 ">Now Playing Movies</h2>

        <div className="flex overflow-x-auto space-x-2 whitespace-nowrap scrollbar-hidden mt-5">
          {loading1 &&
            skeletons.map((skeleton) => (
              <CardContainer key={skeleton}>
                <CardSkeleton />
              </CardContainer>
            ))}
          {NowPlayingMovies?.results.map((show) => {
            return (
              <div
                key={show.id}
                className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md bg-white dark:bg-black shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),_0px_12px_24px_-4px_rgba(145,158,171,0.12)] min-w-[150px] max-w-[200px]" // Set min and max width
                // onClick={() => handleAddToCurrentlyWatching(show)}
              >
                <div className="rounded-md overflow-hidden shadow-[0_6px_10px_0_rgba(0,0,0,0.14),_0_1px_18px_0_rgba(0,0,0,0.12),_0_3px_5px_-1px_rgba(0,0,0,0.20)]">
                  <Link to={`/movie/${show.id}`}>
                    <img
                      src={
                        show.poster_path
                          ? `${baseImage}${show.poster_path}`
                          : "/assets/placeholder.png"
                      }
                      alt={show.title}
                      className="object-cover h-64 w-full"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl mb-5 ">Top Sci-Fic</h2>

        <div className="flex overflow-x-auto space-x-2 whitespace-nowrap scrollbar-hidden mt-5">
          {loading2 &&
            skeletons.map((skeleton) => (
              <CardContainer key={skeleton}>
                <CardSkeleton />
              </CardContainer>
            ))}
          {sci_fic?.results.map((show) => {
            return (
              <div
                key={show.id}
                className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md bg-white dark:bg-black shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),_0px_12px_24px_-4px_rgba(145,158,171,0.12)] min-w-[150px] max-w-[200px]" // Set min and max width
              >
                <div className="rounded-md overflow-hidden shadow-[0_6px_10px_0_rgba(0,0,0,0.14),_0_1px_18px_0_rgba(0,0,0,0.12),_0_3px_5px_-1px_rgba(0,0,0,0.20)]">
                  <Link to={`/movie/${show.id}`}>
                    <img
                      src={
                        show.poster_path
                          ? `${baseImage}${show.poster_path}`
                          : "/assets/placeholder.png"
                      }
                      alt={show.title}
                      className="object-cover h-64 w-full"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-2xl mb-5 ">Top Kids</h2>

        <div className="flex overflow-x-auto space-x-2 whitespace-nowrap scrollbar-hidden mt-5">
          {loading3 &&
            skeletons.map((skeleton) => (
              <CardContainer key={skeleton}>
                <CardSkeleton />
              </CardContainer>
            ))}
          {animation?.results.map((show) => {
            return (
              <div
                key={show.id}
                className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md bg-white dark:bg-black shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),_0px_12px_24px_-4px_rgba(145,158,171,0.12)] min-w-[150px] max-w-[200px]" // Set min and max width
              >
                <div className="rounded-md overflow-hidden shadow-[0_6px_10px_0_rgba(0,0,0,0.14),_0_1px_18px_0_rgba(0,0,0,0.12),_0_3px_5px_-1px_rgba(0,0,0,0.20)]">
                  <Link to={`/movie/${show.id}`}>
                    <img
                      src={
                        show.poster_path
                          ? `${baseImage}${show.poster_path}`
                          : "/assets/placeholder.png"
                      }
                      alt={show.title}
                      className="object-cover h-64 w-full"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl mb-5 ">Top Horror</h2>

        <div className="flex overflow-x-auto space-x-2 whitespace-nowrap scrollbar-hidden mt-5">
          {loading4 &&
            skeletons.map((skeleton) => (
              <CardContainer key={skeleton}>
                <CardSkeleton />
              </CardContainer>
            ))}
          {Horror?.results.map((show) => {
            return (
              <div
                key={show.id}
                className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md bg-white dark:bg-black shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),_0px_12px_24px_-4px_rgba(145,158,171,0.12)] min-w-[150px] max-w-[200px]" // Set min and max width
              >
                <div className="rounded-md overflow-hidden shadow-[0_6px_10px_0_rgba(0,0,0,0.14),_0_1px_18px_0_rgba(0,0,0,0.12),_0_3px_5px_-1px_rgba(0,0,0,0.20)]">
                  <Link to={`/movie/${show.id}`}>
                    <img
                      src={
                        show.poster_path
                          ? `${baseImage}${show.poster_path}`
                          : "/assets/placeholder.png"
                      }
                      alt={show.title}
                      className="object-cover h-64 w-full"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-2xl mb-5 ">Top Tv shows</h2>

        <div className="flex overflow-x-auto space-x-2 whitespace-nowrap scrollbar-hidden mt-5">
          {loading5 &&
            skeletons.map((skeleton) => (
              <CardContainer key={skeleton}>
                <CardSkeleton />
              </CardContainer>
            ))}
          {NowAiringTvShows?.results.map((show) => {
            return (
              <div
                key={show.id}
                className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md bg-white dark:bg-black shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),_0px_12px_24px_-4px_rgba(145,158,171,0.12)] min-w-[150px] max-w-[200px]" // Set min and max width
                // onClick={() => handleAddToCurrentlyWatching(show)}
                // onClick={()=>console.log()}
              >
                <div className="rounded-md overflow-hidden shadow-[0_6px_10px_0_rgba(0,0,0,0.14),_0_1px_18px_0_rgba(0,0,0,0.12),_0_3px_5px_-1px_rgba(0,0,0,0.20)]">
                  <Link to={`/tv/${show.id}`}>
                    <img
                      src={
                        show.poster_path
                          ? `${baseImage}${show.poster_path}`
                          : "/assets/placeholder.png"
                      }
                      alt={show.name}
                      className="object-cover h-64 w-full"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
