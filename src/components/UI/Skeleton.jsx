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

const NewItemSkeleton = ({ index }) => (
  <div className="nft__item" key={index}>
    <div className="author_list_pp">
      <Link
        to="/author"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Creator: Monica Lucas"
      >
        <Skeleton height={"50"} width={"50"} borderRadius={"30%"} />
        <i className="fa fa-check"></i>
      </Link>
    </div>


    <div className="nft__item_wrap">
      <div className="nft__item_extra">
        <div className="nft__item_buttons">
          <button>Buy Now</button>
          <div className="nft__item_share">
            <h4>Share</h4>
            <a href="/" target="_blank" rel="noreferrer">
              <i className="fa fa-facebook fa-lg"></i>
            </a>
            <a href="/" target="_blank" rel="noreferrer">
              <i className="fa fa-twitter fa-lg"></i>
            </a>
            <a href="/">
              <i className="fa fa-envelope fa-lg"></i>
            </a>
          </div>
        </div>
      </div>

      <Link to="/item-details">
        <Skeleton height={"200px"} width={"100%"} />
      </Link>
    </div>
    <div className="nft__item_info">
      <Link to={``}>
        <Skeleton width="180px" height="30px" />
      </Link>
      <Skeleton width="100px" height="20px" />
    </div>
    <div className="nft__item_like">
      <Skeleton width="30px" height="15px" />
    </div>
  </div>
)



export { HotCollectionSkeleton, NewItemSkeleton, Skeleton };

