import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SeasonsEpisodesSkeleton = () => {
  return (
    <>
      <SkeletonTheme baseColor="#3B3F5C" highlightColor="#4A4E6D">
        <Skeleton className="text-2xl font-bold mb-4"></Skeleton>
      </SkeletonTheme>
      <SkeletonTheme baseColor="#3B3F5C" highlightColor="#4A4E6D">
        <div className="flex space-x-2">
          <Skeleton className="btn border-secondary dark:bg-[rgb(27,46,75)] w-28 mb-2 mr-2"></Skeleton>{" "}
          <Skeleton className="btn border-secondary dark:bg-[rgb(27,46,75)] w-28 mb-2 mr-2"></Skeleton>{" "}
          <Skeleton className="btn border-secondary dark:bg-[rgb(27,46,75)] w-28 mb-2 mr-2"></Skeleton>
        </div>
      </SkeletonTheme>
      {/* show episodes here  */}
      <SkeletonTheme baseColor="#3B3F5C" highlightColor="#4A4E6D">
        <SkeletonTheme baseColor="#3B3F5C" highlightColor="#4A4E6D">
          <Skeleton className="text-2xl font-bold mb-4 mt-5"></Skeleton>
        </SkeletonTheme>
        <div>
          <div className="flex overflow-x-auto space-x-2 whitespace-nowrap scrollbar-hidden">
            <Skeleton width={150} height={100} className="rounded-md" />
            <Skeleton width={150} height={100} className="rounded-md" />
            <Skeleton width={150} height={100} className="rounded-md" />
            <Skeleton width={150} height={100} className="rounded-md" />
            <Skeleton width={150} height={100} className="rounded-md" />
            <Skeleton width={150} height={100} className="rounded-md" />
            <Skeleton width={150} height={100} className="rounded-md" />
          </div>
        </div>
      </SkeletonTheme>
    </>
  );
};

export default SeasonsEpisodesSkeleton;
