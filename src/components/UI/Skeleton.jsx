// Import React and Link from react-router-dom
import React from "react";
import { Link } from "react-router-dom";

// Skeleton is a functional component that accepts width, height, and borderRadius as props
// It returns a div with a class of "skeleton-box"
// The style of this div is determined by the width, height, and borderRadius props
const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};


/**
 * Renders a skeleton component for a hot collection.
 * @returns {JSX.Element} The rendered skeleton component.
 */
const HotCollectionSkeleton = () => {
  return (
    <div className="nft_coll" >
      <div className="nft_wrap">
        <Link to={``}>
          <Skeleton width="100%" height="200px" />
        </Link>
      </div>

      <div className="nft_coll_pp">
        <Link to={``}>
          <Skeleton
            width="50px"
            height="50px"
            borderRadius="50%"
          />
        </Link>
        <i className="fa fa-check"></i>
      </div>

      <div className="nft_coll_info">
        <Link to="">
          <Skeleton width="100px" height="20px" />
        </Link>
        <br />
        <Skeleton width="60px" height="20px" />
      </div>
    </div>
  )
}





export { HotCollectionSkeleton };

