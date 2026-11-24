import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const AuthorItems = ({ items, author }) => {
  const fallbackItems = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    title: "Pinky Ocean",
    nftImage,
    price: 2.52,
    likes: 97,
  }));
  const authorItems = items || fallbackItems;
  const profileImage = author ? author.authorImage : AuthorImage;
  const authorUrl = author ? `/author/${author.authorId}` : "/author";

  if (items && items.length === 0) {
    return <p>This creator has no listed items.</p>;
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authorItems.map((item) => {
            const itemUrl = author
              ? `/item-details/${item.nftId}?source=author&author=${author.authorId}`
              : "/item-details";
            const absoluteItemUrl = `${window.location.origin}${itemUrl}`;

            return (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item.id ?? item.nftId}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={authorUrl}>
                      <img
                        className="lazy"
                        src={profileImage}
                        alt={author ? author.authorName : ""}
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
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              absoluteItemUrl
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Share on Facebook"
                          >
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                              absoluteItemUrl
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Share on Twitter"
                          >
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a
                            href={`mailto:?subject=${encodeURIComponent(
                              item.title
                            )}&body=${encodeURIComponent(
                              `Check out this item: ${absoluteItemUrl}`
                            )}`}
                            aria-label="Share by email"
                          >
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={itemUrl}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title}
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={itemUrl}>
                      <h4>{item.title}</h4>
                    </Link>
                    {item.price != null && (
                      <div className="nft__item_price">{item.price} ETH</div>
                    )}
                    {item.likes != null && (
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    )}
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
