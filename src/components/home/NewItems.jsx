import React from "react";
import { Link } from "react-router-dom";
import { useExploreItems } from "../../hooks/useExploreItems";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import ImageWithFallback from "../UI/ImageWithFallback";

const NewItems = () => {
  const { items, loading, error } = useExploreItems();
  const newItems = [...items]
    .sort((a, b) => b.nftId - a.nftId)
    .slice(0, 4);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading && (
            <div className="col-12 text-center py-4">Loading items…</div>
          )}
          {error && !loading && (
            <div className="col-12 text-center py-4">{error}</div>
          )}
          {!loading && !error && newItems.length === 0 && (
            <div className="col-12 text-center py-4">No items available.</div>
          )}
          {!loading && !error && newItems.map((item) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={item.nftId}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${item.authorName}`}
                  >
                    <ImageWithFallback
                      className="lazy"
                      src={item.authorImage}
                      fallbackSrc={AuthorImage}
                      alt={item.authorName}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">5h 30m 32s</div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
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
                      className="lazy nft__item_preview"
                      src={item.nftImage}
                      fallbackSrc={nftImage}
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
    </section>
  );
};

export default NewItems;
