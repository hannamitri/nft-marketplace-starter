import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const AuthorItems = ({ authorData, loading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            /* SKELETON LOADING STATE */
            new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div
                      className="skeleton-box"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#e0e0e0",
                      }}
                    ></div>
                  </div>
                  <div
                    className="nft__item_wrap skeleton-box"
                    style={{
                      height: "200px",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "8px",
                      marginBottom: "20px",
                    }}
                  ></div>
                  <div className="nft__item_info">
                    <div
                      className="skeleton-box mb-2"
                      style={{
                        height: "18px",
                        width: "70%",
                        backgroundColor: "#e0e0e0",
                      }}
                    ></div>
                    <div
                      className="skeleton-box"
                      style={{
                        height: "14px",
                        width: "40%",
                        backgroundColor: "#e0e0e0",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          ) : authorData?.nftCollection &&
            authorData.nftCollection.length > 0 ? (
            /* LIVE API NFT COLLECTION DATA */
            authorData.nftCollection.map((nft) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={nft.id}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${authorData.authorId}`}>
                      <img
                        className="lazy"
                        src={authorData.authorImage || AuthorImage}
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
                    <Link to={`/item-details/${nft.nftId || nft.id}`}>
                      <img
                        src={nft.nftImage || nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${nft.nftId || nft.id}`}>
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
            ))
          ) : (
            <div className="col-lg-12 text-center text-muted py-4">
              <p>No items found for this author.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
