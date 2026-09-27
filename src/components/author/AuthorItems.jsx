
import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({
  items = [],
  loading,
  authorImage,
  authorId,
}) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {/* Skeleton Loading */}
          {loading &&
            new Array(8).fill(0).map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={`skeleton-${index}`}
              >
                <div className="nft__item">
                  <div
                    style={{
                      width: "100%",
                      height: "250px",
                      background: "#e5e5e5",
                      borderRadius: "8px",
                      animation:
                        "authorSkeletonPulse 1.5s ease-in-out infinite",
                    }}
                  ></div>

                  <div style={{ paddingTop: "20px" }}>
                    <div
                      style={{
                        width: "65%",
                        height: "18px",
                        background: "#e5e5e5",
                        borderRadius: "4px",
                        marginBottom: "12px",
                      }}
                    ></div>

                    <div
                      style={{
                        width: "35%",
                        height: "14px",
                        background: "#e5e5e5",
                        borderRadius: "4px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}

          {/* NFT Items */}
          {!loading &&
            items.map((item) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item.id}
              >
                <div className="nft__item">
                  {/* Author */}
                  <div className="author_list_pp">
                    <Link
                      to={
                        authorId
                          ? `/author/${authorId}`
                          : "/author"
                      }
                    >
                      <img
                        className="lazy"
                        src={authorImage}
                        alt="Author"
                      />

                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  {/* NFT Image */}
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>

                        <div className="nft__item_share">
                          <h4>Share</h4>

                          {/* Facebook */}
                          <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Facebook"
                          >
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>

                          {/* X / Twitter */}
                          <a
                            href="https://x.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on X"
                          >
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>

                          {/* Email */}
                          <a
                            href="mailto:?subject=Check out this NFT&body=Check out this NFT!"
                            aria-label="Share by email"
                          >
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/item-details/${item.nftId}`}
                    >
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title || "NFT"}
                      />
                    </Link>
                  </div>

                  {/* NFT Information */}
                  <div className="nft__item_info">
                    <Link
                      to={`/item-details/${item.nftId}`}
                    >
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

          {/* No Items */}
          {!loading && items.length === 0 && (
            <div className="col-md-12 text-center">
              <p>No NFTs found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Skeleton Animation */}
      <style>
        {`
          @keyframes authorSkeletonPulse {
            0% {
              opacity: 1;
            }

            50% {
              opacity: 0.5;
            }

            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AuthorItems;