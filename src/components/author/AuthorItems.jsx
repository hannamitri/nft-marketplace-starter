import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import ImageWithFallback from "../UI/ImageWithFallback";

const AuthorItems = ({
  items = [],
  loading = false,
  error = null,
  profileAuthorImage = "",
  profileAuthorName = "Creator",
}) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading && (
            <div className="col-12 text-center py-4">Loading items…</div>
          )}
          {error && !loading && (
            <div className="col-12 text-center py-4">{error}</div>
          )}
          {!loading && !error && items.length === 0 && (
            <div className="col-12 text-center py-4">No items for this author.</div>
          )}
          {!loading &&
            !error &&
            items.map((item, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={`${item.authorId}-${item.nftId}-${index}`}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <ImageWithFallback
                        className="lazy"
                        src={profileAuthorImage || item.authorImage}
                        fallbackSrc={AuthorImage}
                        alt={profileAuthorName}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button type="button">Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="mailto:">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={`/item-details/${item.nftId}`}>
                      <ImageWithFallback
                        src={item.nftImage}
                        fallbackSrc={nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title}
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    {item.isRecommended && (
                      <div>
                        <small className="text-muted">Recommended</small>
                      </div>
                    )}
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
