import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { IRootState } from "../store";

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Access the current server URL from Redux state
  const currentServer = useSelector(
    (state: IRootState) => state.themeConfig.server
  );

  const isMovie = window.location.pathname.includes("/watch/movie/");
  const isTvShow = window.location.pathname.includes("/watch/tv/");

  const { pathname } = useLocation();
  // console.log(pathname.split("/"));

  const tvID = pathname.split("/")[3];
  const seasonID = pathname.split("/")[4];
  const episodeID = pathname.split("/")[5];

  // https://moviesapi.club
  // https://vidfast.pro
  // https://vidlink.pro
  // https://vidsrc.cc/v2/embed
  // https://vidsrc.rip/embed

  const embedUrl = isMovie
    ? `${currentServer}/movie/${id}`
    : isTvShow
    ? currentServer === "https://moviesapi.club"
      ? `${currentServer}/tv/${tvID}-${seasonID}-${episodeID}`
      : `${currentServer}/tv/${tvID}/${seasonID}/${episodeID}`
    : ``;

  return (
    <div className="space-y-5  mb-20 rounded-2xl overflow-hidden glass-effect ">
      <div className="border border-[#ebedf2] dark:border-[#191e3a] bg-white dark:bg-black">
        <div className="video-container ">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={isMovie ? "Movie Player" : "TV Show Player"}
              width="100%"
              height="535"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <p>Invalid content type.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watch;
