import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ authors, loading }) => {

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading? new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                <div className="skeleton author_list_pp-skeleton"></div>
                </div>
                <div className="nft__item_wrap">
                <div className="skeleton nft__item_wrap-skeleton"></div>
                </div>
                <br />
                <div className="nft__item_info">
                    <h4><div className="skeleton nft_title-skeleton"></div></h4>
                  <div className="nft__item_price"><div className="skeleton nft__item_price-skeleton"></div></div>
                  <div className="nft__item_like">
                  <div className="skeleton nft__item_like-skeleton"></div>
                  </div>
                </div>
              </div>
            </div>
          ))
          :
          
          authors.nftCollection?.map((NFT) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={NFT.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={authors.authorImage} alt="" />
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
                      src={NFT.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{NFT.title}</h4>
                  </Link>
                  <div className="nft__item_price">{NFT.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{NFT.likes}</span>
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
