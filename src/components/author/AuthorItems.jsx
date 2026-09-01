import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({
  items = [],
  authorImage,
  authorName,
}) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item, index) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={item.nftId}
              data-aos="fade-up"
              data-aos-duration="650"
              data-aos-delay={(index % 4) * 100}
              data-aos-offset="100"
              data-aos-once="true"
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="/author">
                    <img
                      className="lazy"
                      src={authorImage}
                      alt={authorName}
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

                        <button
                          type="button"
                          className="share-icon-button"
                          aria-label="Share on Facebook"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </button>

                        <button
                          type="button"
                          className="share-icon-button"
                          aria-label="Share on Twitter"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </button>

                        <button
                          type="button"
                          className="share-icon-button"
                          aria-label="Share by email"
                        >
                          <i className="fa fa-envelope fa-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details">
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>

                  <div className="nft__item_price">
                    {item.price} ETH
                  </div>

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