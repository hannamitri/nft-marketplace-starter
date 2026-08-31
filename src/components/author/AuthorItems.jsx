import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ author, items = [] }) => {
  if (items.length === 0) {
    return (
      <div
        className="text-center"
        style={{ padding: "60px 20px" }}
      >
        <h3>No NFTs found</h3>

        <p>
          No NFT items were returned for{" "}
          {author?.authorName || "this author"}.
        </p>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item, index) => {
            const itemId =
              item.id || item.nftId || index;

            const itemTitle =
              item.title || "Untitled NFT";

            const itemImage =
              item.nftImage || "";

            const itemPrice =
              item.price ?? 0;

            const itemLikes =
              item.likes ?? 0;

            return (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={itemId}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <img
                      className="lazy"
                      src={author?.authorImage}
                      alt={`${author?.authorName || "Author"} profile`}
                    />

                    <i
                      className="fa fa-check"
                      aria-hidden="true"
                    ></i>
                  </div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button type="button">
                          Buy Now
                        </button>

                        <div className="nft__item_share">
                          <h4>Share</h4>

                          <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Share on Facebook"
                          >
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>

                          <a
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Share on Twitter"
                          >
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>

                          <a
                            href={`mailto:?subject=${encodeURIComponent(
                              itemTitle
                            )}`}
                            aria-label="Share by email"
                          >
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/item-details/${itemId}`}
                      state={{ item }}
                    >
                      <img
                        src={itemImage}
                        className="lazy nft__item_preview"
                        alt={itemTitle}
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link
                      to={`/item-details/${itemId}`}
                      state={{ item }}
                    >
                      <h4>{itemTitle}</h4>
                    </Link>

                    <div className="nft__item_price">
                      {itemPrice} ETH
                    </div>

                    <div className="nft__item_like">
                      <i
                        className="fa fa-heart"
                        aria-hidden="true"
                      ></i>

                      <span>{itemLikes}</span>
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
