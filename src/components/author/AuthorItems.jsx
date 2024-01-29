import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ author, skeleton }) => {
  const skeletonArray = Array.from({ length: 8 }).fill(null);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {skeleton
            ? skeletonArray.map((_, index) => {
                return (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={index}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton borderRadius={50} height={50} width={50} />
                      </div>
                      <div className="nft__item_wrap">
                        <Skeleton height="60%" width="100%" borderRadius={8} />
                      </div>
                      <div className="nft__item_info">
                        <h4>
                          <Skeleton height={20} width={100} borderRadius={4} />
                        </h4>
                        <div className="nft__item_price">
                          <Skeleton height={20} width={60} borderRadius={4} />
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>
                            <Skeleton height={20} width={50} borderRadius={4} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : author.nftCollection.map((nft, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img className="lazy" src={author.authorImage} alt="" />
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
                      <Link to="/item-details">
                        <img
                          src={nft.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{nft.title}</h4>
                      </Link>
                      <div className="nft__item_price">{nft.price}</div>
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
