import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../skeleton/Skeleton";

const AuthorItems = ({ items, author, loadingItems }) => {
  const skeletonArray = new Array(8).fill(null);

  const renderSkeletonCard = (index) => (
    <div
      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
      key={`skeleton-${index}`}
    >
      <div className="nft__item">

        {/* AUTHOR ICON */}
        <div className="author_list_pp">
          <Skeleton circle width={50} height={50} />
        </div>

        {/* NFT IMAGE */}
        <div className="nft__item_wrap">
          <Skeleton height={200} />
        </div>

        {/* NFT INFO */}
        <div className="nft__item_info">
          <Skeleton width="80%" height={20} />
          <div className="nft__item_price">
            <Skeleton width={60} height={18} />
          </div>
          <div className="nft__item_like">
            <Skeleton width={30} height={18} />
          </div>
        </div>

      </div>
    </div>
  );

  const renderItemCard = (item) => (
    <div
      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
      key={item.nftId}
    >
      <div className="nft__item">

        {/* AUTHOR ICON */}
        <div className="author_list_pp">
          <Link to={`/author/${author.authorId}`}>
            <img
              className="lazy"
              src={author.authorImage}
              alt={author.authorName}
            />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        {/* NFT IMAGE */}
        <div className="nft__item_wrap">
          <Link to={`/item-details/${item.nftId}`} state={{ item }}>
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt={item.title}
            />
          </Link>
        </div>

        {/* NFT INFO */}
        <div className="nft__item_info">
          <Link to={`/item-details/${item.nftId}`} state={{ item }}>
            <h4>{item.title}</h4>
          </Link>

          <div className="nft__item_price">
            {item.price} ETH
          </div>

          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loadingItems
            ? skeletonArray.map((_, index) => renderSkeletonCard(index))
            : items.map((item) => renderItemCard(item))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;