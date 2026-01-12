import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CastSection = () => {
  return (
    <div className="flex space-x-3">
      <SkeletonTheme baseColor="#3B3F5C" highlightColor="#4A4E6D">
        <Skeleton
          className="bg-white dark:bg-[#1b2e4b] rounded-md overflow-hidden border border-white-light dark:border-dark  p-3 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center "
          style={{ width: "250px", height: "150px" }}
        ></Skeleton>
      </SkeletonTheme>
      <SkeletonTheme baseColor="#3B3F5C" highlightColor="#4A4E6D">
        <Skeleton
          className="bg-white dark:bg-[#1b2e4b] rounded-md overflow-hidden border border-white-light dark:border-dark  p-3 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center "
          style={{ width: "250px", height: "150px" }}
        ></Skeleton>
      </SkeletonTheme>
      <SkeletonTheme baseColor="#3B3F5C" highlightColor="#4A4E6D">
        <Skeleton
          className="bg-white dark:bg-[#1b2e4b] rounded-md overflow-hidden border border-white-light dark:border-dark  p-3 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center "
          style={{ width: "250px", height: "150px" }}
        ></Skeleton>
      </SkeletonTheme>
    </div>
  );
};

export default CastSection;
