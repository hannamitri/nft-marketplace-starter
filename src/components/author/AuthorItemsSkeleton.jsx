import React from "react";
import Skeleton from "../UI/Skeleton";
import { Link } from "react-router-dom";

const AuthorItemsSkeleton = () => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width={50} height={50} borderRadius={50} />
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
                  <Skeleton width="100%" height="100%" borderRadius={8} />
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>
                      <Skeleton width={30} height={16} borderRadius={4} />
                    </h4>
                  </Link>
                  <div className="nft__item_price">
                    <Skeleton width={24} height={16} borderRadius={4} />
                  </div>
                  <div className="nft__item_like">
                    <span>
                      <Skeleton width={30} height={16} borderRadius={4} />
                    </span>
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

export default AuthorItemsSkeleton;
