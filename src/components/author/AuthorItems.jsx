import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const SkeletonCards = ({ count = 8 }) => (
  <>
    <style>{`
      .ai-sk-card {
        pointer-events: none;
      }

      .ai-sk-card .ai-sk-avatar {
        width: 50px;
        height: 50px;
        border: 3px solid #fff;
        border-radius: 50%;
        box-sizing: border-box;
      }

      .ai-sk-card .ai-sk-image {
        display: block;
        width: 100%;
        height: 200px;
        border-radius: 8px;
      }

      .ai-sk-card .ai-sk-title {
        width: 65%;
        height: 18px;
        margin-bottom: 10px;
        border-radius: 4px;
      }

      .ai-sk-card .ai-sk-price {
        width: 35%;
        height: 14px;
        border-radius: 4px;
      }

      .ai-sk-card .ai-sk-like {
        width: 32px;
        height: 14px;
        border-radius: 4px;
      }

      .ai-sk-shimmer {
        background: linear-gradient(
          90deg,
          #e2e2e7 25%,
          #f5f5f8 50%,
          #e2e2e7 75%
        );
        background-size: 200% 100%;
        animation: ai-sk-shine 1.5s ease-in-out infinite;
      }

      @keyframes ai-sk-shine {
        from {
          background-position: -200% 0;
        }
        to {
          background-position: 200% 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ai-sk-shimmer {
          animation: none;
        }
      }
    `}</style>

    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
        aria-hidden="true"
      >
        <div className="nft__item ai-sk-card">
          <div className="author_list_pp">
            <div className="ai-sk-avatar ai-sk-shimmer" />
          </div>

          <div className="nft__item_wrap">
            <div className="ai-sk-image ai-sk-shimmer" />
          </div>

          <div className="nft__item_info">
            <div className="ai-sk-title ai-sk-shimmer" />

            <div className="nft__item_price">
              <div className="ai-sk-price ai-sk-shimmer" />
            </div>

            <div className="nft__item_like">
              <div className="ai-sk-like ai-sk-shimmer" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

const AuthorItems = ({
  items = [],
  authorId,
  authorImage,
  authorName,
  loading = false,
}) => {
  const collection = Array.isArray(items) ? items : [];

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row" aria-busy={loading}>
          {loading ? (
            <SkeletonCards />
          ) : collection.length === 0 ? (
            <div className="col-12 text-center">
              <p>This author has no items to display.</p>
            </div>
          ) : (
            collection.map((item) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item.nftId ?? item.id}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${authorId}`}>
                      <img
                        className="lazy"
                        src={authorImage || AuthorImage}
                        alt={authorName || "Author"}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <Link to={`/item-details/${item.nftId}`}>
                          <button type="button">Buy Now</button>
                        </Link>

                        <div className="nft__item_share">
                          <h4>Share</h4>

                          <a
                            href=""
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>

                          <a
                            href=""
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>

                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage || nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title}
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
