import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FollowSection = ({
  followerCount,
  isFollowing,
  handleFollowClick,
  isLoading,
}) => (
  <div className="profile_follow de-flex">
    <div className="de-flex-col">
      {isLoading ? (
        <>
          <div className="profile_follower">
            <Skeleton height={26} width={102} />
          </div>
          <Skeleton height={42} width={123} />
        </>
      ) : (
        <>
          <div className="profile_follower">{followerCount} followers</div>
          <Link
            to="#"
            className={`btn-main ${isFollowing ? "followed" : ""}`}
            onClick={handleFollowClick}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Link>
        </>
      )}
    </div>
  </div>
);

export default FollowSection;
