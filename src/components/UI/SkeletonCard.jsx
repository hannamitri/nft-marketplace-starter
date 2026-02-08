import Skeleton from "./Skeleton";

const SkeletonCard = () => {
  return (
    <div className="nft_coll">

      {/* Image Skeleton */}
      <Skeleton width="100%" height="180px" borderRadius="8px" />

      {/* Avatar Skeleton */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
        <Skeleton width="60px" height="60px" borderRadius="50%" />
      </div>

      {/* Title Skeleton */}
      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <Skeleton width="70%" height="20px" borderRadius="6px" />
      </div>

      {/* Text Skeleton */}
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <Skeleton width="40%" height="15px" borderRadius="6px" />
      </div>

    </div>
  );
};

export default SkeletonCard;