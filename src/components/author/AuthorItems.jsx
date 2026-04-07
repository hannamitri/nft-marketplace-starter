import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const AuthorItems = ({ items, loading, authorImage }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">

          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">

                    <div className="author_list_pp">
                      <div className="skeleton-circle"></div>
                    </div>

                    <div className="nft__item_wrap">
                      <div className="skeleton-box"></div>
                    </div>

                    <div className="nft__item_info">
                      <div className="skeleton-text"></div>
                      <div className="skeleton-text small"></div>
                    </div>

                  </div>
                </div>
              ))
            : items?.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">

                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy"
                          src={authorImage || AuthorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="nft__item_wrap">
                      <Link
                        to={`/item-details/${item.nftId}`}
                        state={item}
                      >
                        <img
                          src={item.nftImage || nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link
                        to={`/item-details/${item.nftId}`}
                        state={item}
                      >
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
              ))}

        </div>
      </div>
    </div>
  );
};

export default AuthorItems;