import React from 'react';
import { Link } from 'react-router-dom';

const SkeletonCardMini = ({ itemNo, className }) => {

  let skeletonArray = new Array(itemNo).fill(0)

  return (
    skeletonArray.map((_, index) => (
      <div className={className} key={index}>
        <div className="carousel__item">
        <div className="nft_coll">
          <div className="nft_wrap skeleton">
            <Link to="/item-details">
              <img className="lazy img-fluid skeleton" alt="" />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/author">
              <img className="header__img skeleton" alt="" />
            </Link>
            <i className="fa fa-check skeleton"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <div className="skeleton skeleton__text--title"></div>
            </Link>
            <div className="skeleton skeleton__text"></div>
          </div>
        </div>
        </div>
      </div>
    ))
  );
}

export default SkeletonCardMini;
