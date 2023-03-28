import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";


const AuthorItems = ({ authorData, isLoading }) => {

  const renderSkeleton = () => <Skeleton type="Items" />;
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          { isLoading ? Array(8)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                {renderSkeleton()}
              </div>
            )):
            authorData.nftCollection.map((items, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img
                          className="lazy"
                          src={authorData.authorImage}
                          alt=""
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
                      <Link to={`/item-details/${items.nftId}`}>
                        <img
                          src={items.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${items.nftId}`}>
                        <h4>{items.title}</h4>
                      </Link>
                      <div className="nft__item_price">{items.price}</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{items.likes}</span>
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
