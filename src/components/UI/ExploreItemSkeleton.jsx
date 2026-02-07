import Skeleton from "./Skeleton";

const ExploreItemSkeleton = () => {
  return (
    <div className="nft__item">

      {/* Avatar */}
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>

      {/* Countdown */}
      <div className="de_countdown">
        <Skeleton width="80px" height="18px" borderRadius="6px" />
      </div>

      {/* NFT Image */}
      <div className="nft__item_wrap">
        <Skeleton width="100%" height="220px" borderRadius="10px" />
      </div>

      {/* Title */}
      <div className="nft__item_info">
        <Skeleton width="70%" height="18px" borderRadius="6px" />

        {/* Price */}
        <div style={{ marginTop: "10px" }}>
          <Skeleton width="40%" height="16px" borderRadius="6px" />
        </div>

        {/* Likes */}
        <div style={{ marginTop: "10px" }}>
          <Skeleton width="30%" height="16px" borderRadius="6px" />
        </div>
      </div>

    </div>
  );
};

export default ExploreItemSkeleton;