import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ author, loading }) => {
  const items = author?.nftCollection || [];

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading && Array.from({ length: 8 }).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>
                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="260px" borderRadius="8px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="70%" height="20px" borderRadius="4px" />
                  <div className="mt-2">
                    <Skeleton width="40%" height="16px" borderRadius="4px" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!loading && items.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${author.authorId}`}>
                    <img className="lazy" src={author.authorImage} alt={author.authorName?.trim() || "Author"} />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title?.trim() || "NFT item"}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title?.trim()}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
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
