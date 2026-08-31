import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ nftCollection, authorImg }) => {
  // Fallback check for empty or missing collection
  if (!nftCollection || nftCollection.length === 0) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row text-center py-4">
            <p>This author currently has no NFTs in their collection.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.map((item) => (
            <div
              key={item.id || item.nftId}
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <span className="author_avatar_wrapper">
                    <img className="lazy" src={authorImg} alt="" />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button type="button">Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <button type="button" aria-label="Share on Facebook">
                          <i className="fa fa-facebook fa-lg"></i>
                        </button>
                        <button type="button" aria-label="Share on Twitter">
                          <i className="fa fa-twitter fa-lg"></i>
                        </button>
                        <button type="button" aria-label="Share via Email">
                          <i className="fa fa-envelope fa-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
                    />
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