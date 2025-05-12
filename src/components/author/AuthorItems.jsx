import React from "react";
import { Link } from "react-router-dom";
import LoadingSkeleton from "../home/LoadingSkeleton";

const AuthorItems = ({ nftCollection, itemsLoading }) => {

  if (itemsLoading) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
             <LoadingSkeleton count={8} />
          </div>
        </div>
      </div>
    );
  }

  if (!nftCollection || nftCollection.length === 0) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            <div className="col-lg-12">
              No NFTs found for this author.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.map((nft) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
              <div className="nft__item">
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
                  <Link to={`/item-details/${nft.nftId}`}>
                    <img
                      src={nft.nftImage}
                      className="lazy nft__item_preview"
                      alt={nft.title}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;