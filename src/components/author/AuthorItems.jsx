import React from "react";
import { Link } from "react-router-dom";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import ItemShareButtons from "../UI/ItemShareButtons";

const AuthorItems = ({
  authorId,
  items = [],
  loading,
  authorImage,
  authorName,
}) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item skeleton-nft-item">
                  <div className="skeleton skeleton-author"></div>
                  <div className="skeleton skeleton-nft-image"></div>

                  <div className="skeleton-nft-info">
                    <div className="skeleton skeleton-nft-title"></div>
                    <div className="skeleton skeleton-nft-price"></div>
                  </div>
                </div>
              </div>
            ))
          ) : items.length === 0 ? (
            <div className="col-lg-12 text-center">
              <h4>This author hasn't listed any NFTs yet.</h4>
            </div>
          ) : (
            items.map((item) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item.nftId}
              >
                <div className="nft__item" data-aos="fade-up">
                  <div className="author_list_pp">
                    <Link to={`/author/${authorId}`}>
                      <img
                        className="lazy"
                        src={authorImage || AuthorImage}
                        alt={authorName || "Author"}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="nft__item_wrap">
                    <ItemShareButtons />

                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage || nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title || "NFT"}
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>

                    <div className="nft__item_price">{item.price} ETH</div>

                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
