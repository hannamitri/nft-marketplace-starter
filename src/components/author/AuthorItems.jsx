import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ items, loading }) => {
  // FIXED: Correct "no items" condition
  if (!items || items.length === 0) {
    return <p className="text-center">No items found for this author.</p>;
  }

  return (
    <div className="row">
      {loading ? (
  <>
    {new Array(9).fill(0).map((_, index) => (
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
        <div className="nft__item">
          <div className="nft__item_wrap">
            <div className="skeleton skeleton-img"></div>
          </div>

          <div className="nft__item_info">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-price"></div>
          </div>
        </div>
      </div>
    ))}
  </>
) : (

        <>
          {items.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.nftId}
>
              <div className="nft__item">
                <div className="nft__item_wrap">
                  <Link to={`/item/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to={`/item/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>

                  <div className="nft__item_price">{item.price} ETH</div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AuthorItems;




