import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ author, items = [], loading }) => {
  const displayItems = loading ? new Array(4).fill(null) : items;

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {displayItems.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              {loading ? (
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="230px" borderRadius="8px" />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width="70%" height="24px" borderRadius="4px" />
                    <Skeleton width="45%" height="18px" borderRadius="4px" />
                  </div>
                </div>
              ) : (
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="">
                      <img className="lazy" src={item?.authorImage || author?.authorImage || AuthorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={item ? `/item-details/${item.id}` : "/item-details"} state={item ? { item } : undefined}>
                      <img
                        src={item?.nftImage || nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={item ? `/item-details/${item.id}` : "/item-details"} state={item ? { item } : undefined}>
                      <h4>{item?.title || "Pinky Ocean"}</h4>
                    </Link>
                    <div className="nft__item_price">{item?.price || "2.52 ETH"}</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item?.likes || 97}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
