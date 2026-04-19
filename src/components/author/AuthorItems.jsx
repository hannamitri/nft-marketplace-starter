import React from "react";
import { Link } from "react-router-dom";

const skeletonStyle = {
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
  backgroundSize: "200% 100%",
  animation : "shimmer 1.4s ease infinite",
  borderRadius: "8px",
};

const AuthorItems = ({ nftCollection, authorImage, authorId }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection
            ? nftCollection.map((nft, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${authorId}`}>
                    <img className="lazy" src={authorImage} alt="" />
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
                        <a href="" target="_blank" rel="noreferrer" >
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${nft.nftId}`}>
                    <img
                      src={nft.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${nft.nftId}`}>
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
            : new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div style={{ ...skeletonStyle, height: "50px", width: "50px", borderRadius: "50%", margin: "8px auto" }} />
                <div className="nft__item_wrap">
                  <div style={{ ...skeletonStyle, height: "180px" }} />
                </div>
                <div className="nft__item_info">
                  <div style={{ ...skeletonStyle, height: "16px", width: "60%", margin: "8px auto" }} />
                  <div style={{ ...skeletonStyle, height: "14px", width: "40%", margin: "8px auto" }} />
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
