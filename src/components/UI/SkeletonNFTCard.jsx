import React from "react";
import { Link } from "react-router-dom";

const SkeletonNFTCard = ({ index, inSlider }) => {

  return (
    <div className={inSlider ? "" : "col-lg-3 col-md-6 col-sm-6 col-xs-12"} key={index}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to="/author"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Creator: Monica Lucas"
          >
            <div className="skeleton skeleton__pfp"></div>
          </Link>
        </div>
        <div className="de_countdown skeleton">5h 30m 32s</div>

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                
              </div>
            </div>
          </div>

          <div className="skeleton skeleton__nft"></div>
        </div>
        <div className="nft__item_info">
          <div className="skeleton skeleton__title"></div>
          <div className="nft__item_price skeleton skeleton__price">
            3.08 ETH
          </div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonNFTCard;
