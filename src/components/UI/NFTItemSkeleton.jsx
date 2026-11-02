import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

const NFTItemSkeleton = () => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={``}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas"
        >
          <Skeleton
            width="50px"
            height="50px"
            borderRadius="50%"
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <Link to={``}>
          <Skeleton width="100%" height="350px" />
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
  );
};

export default NFTItemSkeleton;