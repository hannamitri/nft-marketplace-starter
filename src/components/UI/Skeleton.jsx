import { useEffect, useState } from "react";

const Skeleton = ({
  width,
  height,
  borderRadius,
  margin,
  display,
  maxWidth,
  visibility,
}) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setShowSkeleton(false);
  }, []);
  return (
    <>
      <div
        className="skeleton-box"
        style={{
          width,
          height,
          borderRadius,
          margin,
          display,
          maxWidth,
          visibility,
        }}
      ></div>
    </>
  );
};
// Skeleton for Author details on  Item-detail page ////////////////
export const ItemDetailSkeleton = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Skeleton
          width={"100%"}
          maxWidth={"80px"}
          height={"30px"}
          margin={"0 12px 0 0"}
        />
        <Skeleton width={"100%"} maxWidth={"80px"} height={"30px"} />
      </div>
      <Skeleton width={"100%"} height={"120px"} margin={"2rem 0 1rem 0"} />
      <h6>Owner</h6>
      <div style={{ display: "flex" }}>
        <Skeleton
          width={"100%"}
          maxWidth={"40px"}
          height={"40px"}
          borderRadius={"100%"}
        />
        <Skeleton
          width={"100%"}
          maxWidth={"100px"}
          height={"15px"}
          margin={"0 0 0 1rem"}
        />
      </div>
      <h6>Creator</h6>
      <div style={{ display: "flex" }}>
        <Skeleton
          width={"100%"}
          maxWidth={"40px"}
          height={"40px"}
          borderRadius={"100%"}
        />
        <Skeleton
          width={"100%"}
          maxWidth={"100px"}
          height={"15px"}
          margin={"0 0 0 1rem"}
        />
      </div>
      <h6>Price</h6>
      <div style={{ display: "flex" }}>
        <Skeleton
          width={"100%"}
          maxWidth={"40px"}
          height={"40px"}
          borderRadius={"100%"}
        />
        <Skeleton
          width={"100%"}
          maxWidth={"100px"}
          height={"15px"}
          margin={"0 0 0 1rem"}
        />
      </div>
    </div>
  );
};

export default Skeleton;
