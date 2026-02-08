import React from "react";
import { Link } from "react-router-dom";
import AuthorSkeleton from "../UI/AuthorSkeleton";

const AuthorItems = ({ items, authorImage, loading }) => {
  console.log(items)

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">

          {loading
            ? new Array(8).fill(0).map((_, i) => (
                <AuthorSkeleton key={i} />
              ))
            : items.map((item) => (
                <div
                  key={item.nftId}
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <div className="nft__item">

                    <div className="author_list_pp">
                      <img src={authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
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
