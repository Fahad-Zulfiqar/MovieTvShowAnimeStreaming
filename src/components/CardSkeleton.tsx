import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      <SkeletonTheme baseColor="#3B3F5C" highlightColor="#4A4E6D">
        <Skeleton width={210} height={250} className="rounded-md" />
      </SkeletonTheme>
    </div>
  );
}

export default CardSkeleton;
