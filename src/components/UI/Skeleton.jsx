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

export default Skeleton;
