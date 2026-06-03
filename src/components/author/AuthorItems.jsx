import React from "react";
import { Link } from "react-router-dom";
import "./AuthorItems.css";

const AuthorItems = ({ nftCollection = [], authorImage, authorId, loading }) => {
  function skeletonCards() {
    return new Array(8).fill(0).map((_, index) => (
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
        <div className="nft__item">
          <div className="author_list_pp">
            <div className="nft-skeleton-author-avatar"></div>
          </div>
          <div className="nft__item_wrap">
            <div className="nft-skeleton-image"></div>
          </div>
          <div className="nft__item_info">
            <div className="nft-skeleton-title"></div>
            <div className="nft-skeleton-price"></div>
            <div className="nft-skeleton-likes"></div>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? skeletonCards() : nftCollection.map((nft, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${authorId}`}>
                    <img className="lazy" src={authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <Link to={`/item-details/${nft.nftId}`}>
                    <img
                      src={nft.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${nft.nftId}`}>
                    <h4>{nft.title}</h4>
                  </Link>
                  <div className="nft__item_price">{nft.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{nft.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
