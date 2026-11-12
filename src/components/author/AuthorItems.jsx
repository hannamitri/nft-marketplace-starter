import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const AuthorItems = ({ items, authorId, authorImage }) => {
  const list = Array.isArray(items) ? items : new Array(8).fill(null);
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {list.map((item, index) => {
            const nftId = item?.nftId ?? item?.nftID ?? item?.nftid ?? item?.id;
            const detailsPath =
              nftId == null
                ? "/item-details"
                : `/item-details/${encodeURIComponent(nftId)}`;
            const detailsState = { item, authorId, authorImage };

            return (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item?.id ?? nftId ?? index}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="">
                      <img
                        className="lazy"
                        src={authorImage ?? AuthorImage}
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
                    <Link to={detailsPath} state={detailsState}>
                      <img
                        src={item?.nftImage ?? item?.nftimage ?? nftImage}
                        className="lazy nft__item_preview"
                        alt={item?.title ?? "NFT artwork"}
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={detailsPath} state={detailsState}>
                      <h4>{item?.title ?? "Pinky Ocean"}</h4>
                    </Link>
                    <div className="nft__item_price">
                      {item?.price ?? "2.52"} ETH
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item?.likes ?? 97}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
