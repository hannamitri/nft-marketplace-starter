import Skeleton from "./Skeleton";

const TopSellerSkeleton = () => {
  return (
    <li className="author_skeleton">

      {/* Avatar */}
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>

      {/* Text */}
      <div className="author_list_info">

        <Skeleton width="120px" height="18px" borderRadius="6px" />

        <div style={{ marginTop: "8px" }}>
          <Skeleton width="70px" height="16px" borderRadius="6px" />
        </div>

      </div>

    </li>
  );
};

export default TopSellerSkeleton;