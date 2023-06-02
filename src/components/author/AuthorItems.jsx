import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ collection, author, loading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!loading
            ? collection.map((collection, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <img
                        style={{ cursor: "default" }}
                        className="lazy"
                        src={author.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
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
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <h4>{collection.title}</h4>
                      <div className="nft__item_price">
                        {collection.price} ETH
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{collection.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : new Array(8).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-xs-12" key={index}>
                  <div
                    style={{
                      paddingRight: "12px",
                      paddingLeft: "12px",
                      maxWidth: "initial",
                      margin: "0 auto",
                      marginBottom: "25px",
                    }}
                    className="nft__item"
                  >
                    <div className="author_list_pp">
                      <div
                        className="lazy skeleton-box"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          width: "50px",
                          height: "50px",
                          borderRadius: "100%",
                        }}
                      ></div>
                      <i className="fa fa-check"></i>
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
                      <div
                        className="lazy nft__item_preview skeleton-box"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          width: "100%",
                          height: "220px",
                        }}
                      ></div>
                    </div>
                    <div className="nft__item_info">
                      <div
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          borderRadius: "5px",
                          width: "100px",
                          height: "20px",
                        }}
                      ></div>
                      <div
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          borderRadius: "5px",
                          width: "60px",
                          height: "20px",
                          marginTop: "10px",
                        }}
                        className="nft__item_price skeleton-box"
                      ></div>
                      <div className="nft__item_like">
                        <div
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            borderRadius: "5px",
                            width: "30px",
                            height: "20px",
                            marginBottom: "10px",
                          }}
                        ></div>
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
