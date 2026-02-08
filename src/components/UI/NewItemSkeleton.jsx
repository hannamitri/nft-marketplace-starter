import Skeleton from "./Skeleton";

const NewItemSkeleton = () => {
  return (
    <div className="nft__item">

      {/* Author Avatar */}
      <Skeleton width="50px" height="50px" borderRadius="50%" />

      {/* Countdown */}
      <div style={{ marginTop: "10px" }}>
        <Skeleton width="80px" height="18px" borderRadius="6px" />
      </div>

      {/* NFT Image */}
      <div style={{ marginTop: "15px" }}>
        <Skeleton width="100%" height="220px" borderRadius="10px" />
      </div>

      {/* Title */}
      <div style={{ marginTop: "15px" }}>
        <Skeleton width="70%" height="20px" borderRadius="6px" />
      </div>

      {/* Price */}
      <div style={{ marginTop: "10px" }}>
        <Skeleton width="40%" height="18px" borderRadius="6px" />
      </div>

      {/* Likes */}
      <div style={{ marginTop: "10px" }}>
        <Skeleton width="30%" height="18px" borderRadius="6px" />
      </div>

    </div>
  );
};

export default NewItemSkeleton;