import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSectionLayout = () => {
  return (
    <>
      <div className="panel h-full flex items-center justify-center">
        <div className="rounded-md overflow-hidden  ">
          <SkeletonTheme baseColor="#3B3F5C" highlightColor="#4A4E6D">
            <Skeleton width={210} height={280} className="rounded-md" />
          </SkeletonTheme>
        </div>
      </div>
      {/* second div */}
      <div className="panel h-full xl:col-span-2">
        <div className="relative">
          <SkeletonTheme baseColor="#3B3F5C" highlightColor="#4A4E6D">
            <Skeleton className="text-3xl mb-5 font-bold"></Skeleton>
          </SkeletonTheme>
          {/* <Link
            to={`/watch/tv/${tvDetail?.id}/1/1`}
            className="btn border-secondary dark:bg-[#1b2e4b] w-28 mb-5 outline-none"
            // onClick={() => handleAddToCurrentlyWatching(tvDetail)}
          >
            play
          </Link> */}
          <SkeletonTheme baseColor="#3B3F5C" highlightColor="#4A4E6D">
            <Skeleton count={3}></Skeleton>
          </SkeletonTheme>
          <div className="flex mt-5 space-x-2">
            <SkeletonTheme baseColor="#3B3F5C" highlightColor="#4A4E6D">
              <Skeleton
                className="bg-slate-700 rounded-full px-3 py-1"
                style={{ width: "80px", height: "30px" }}
              />
              <Skeleton
                className="bg-slate-700 rounded-full px-3 py-1"
                style={{ width: "80px", height: "30px" }}
              />
              <Skeleton
                count={1}
                className="bg-slate-700 rounded-full px-3 py-1"
                style={{ width: "80px", height: "30px" }}
              />
            </SkeletonTheme>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSectionLayout;
