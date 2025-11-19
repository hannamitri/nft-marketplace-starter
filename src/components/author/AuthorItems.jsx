import React from "react";
import { Link } from "react-router-dom";
import nftImageFallback from "../../images/nftImage.jpg";

const AuthorItems = ({ nftCollection }) => {
  if (!nftCollection || nftCollection.length === 0) {
    return <div className="text-center mt-4">No items found for this author.</div>;
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.nftId}>
              <div className="nft__item">

                {/* Removed the author avatar/icon */}

                <div className="nft__item_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage || nftImageFallback}
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







