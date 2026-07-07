import React from "react";
import { Link } from "react-router-dom";

const SkeletonItem = () => (
  <div className="nft__item">
    <div className="author_list_pp">
      <div className="skeleton" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
    </div>
    <div className="nft__item_wrap">
      <div className="skeleton" style={{ width: "100%", height: "200px", borderRadius: "8px" }}></div>
    </div>
    <div className="nft__item_info">
      <div className="skeleton" style={{ width: "80%", height: "20px", marginBottom: "8px" }}></div>
      <div className="skeleton" style={{ width: "40%", height: "16px" }}></div>
    </div>
  </div>
);

const AuthorItems = ({ nftCollection = [], loading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, i) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
                  <SkeletonItem />
                </div>
              ))
            : nftCollection.map((item) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img className="lazy" src={item.nftImage} alt={item.title} />
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
                      <Link to={`/item-details/${item.nftId}`}>
                        <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
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