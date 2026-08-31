import React, { useRef, useLayoutEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/**
 * PixelPerfectSkeleton
 * Wraps any JSX and replaces it with a skeleton of the exact same size.
 *
 * @param {boolean} loading - Whether to show skeleton
 * @param {React.ReactNode} children - The content to wrap
 */
export default function PixelPerfectSkeleton({ loading, children }) {
  const wrapperRef = useRef(null);
  const [size, setSize] = useState({ width: null, height: null });

  useLayoutEffect(() => {
    if (wrapperRef.current && loading) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setSize({
        width: rect.width,
        height: rect.height,
      });
    }
  }, [loading]);

  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div ref={wrapperRef} style={{ display: "inline-block" }}>
        {loading && size.width && size.height ? (
          <Skeleton width={size.width} height={size.height} />
        ) : (
          children
        )}
      </div>
    </SkeletonTheme>
  );
}
