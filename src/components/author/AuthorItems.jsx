import React from "react";
import { Link } from "react-router-dom";
import AuthorLink from "../utils/AuthorLink";
import Countdown from "../home/Countdown";

const AuthorItems = ({ items, loading }) => {
  if (loading) {
    // 🧼 Shimmer placeholders — feel free to swap out styles for Tailwind or custom CSS
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
                <div className="nft__item skeleton-card animate-pulse">
                  <div className="author_list_pp">
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#ccc",
                        marginBottom: "8px",
                      }}
                    />
                  </div>
                  <div className="nft__item_wrap">
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        backgroundColor: "#ddd",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                  <div className="nft__item_info">
                    <div
                      style={{
                        width: "60%",
                        height: "20px",
                        backgroundColor: "#eee",
                        borderRadius: "4px",
                        marginBottom: "6px",
                      }}
                    />
                    <div
                      style={{
                        width: "40%",
                        height: "16px",
                        backgroundColor: "#eee",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(items) || items.length === 0) {
    console.warn("❌ AuthorItems received empty or malformed items:", items);
    return (
      <div className="text-center py-4 text-danger">
        🚫 No NFTs found for this author.{" "}
        <Link to="/explore" className="text-primary underline">
          Browse creators
        </Link>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item) => (
            <div
              key={item.nftId}
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
            >
              <div className="nft__item position-relative">
                {/* Countdown Pill */}
                {item.expiryDate && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      right: "-25px",
                      zIndex: "10",
                      backgroundColor: "#14141f",
                      color: "#fff",
                      borderRadius: "12px",
                      padding: "6px 12px",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      maxWidth: "fit-content",
                      display: "inline-flex",
                    }}
                  >
                    <Countdown expiryDate={item.expiryDate} />
                  </div>
                )}

                {/* Avatar */}
                <div className="author_list_pp">
                  <AuthorLink id={item.authorId}>
                    <img
                      className="lazy"
                      src={item.authorImage}
                      alt={item.authorName}
                    />
                    <i className="fa fa-check" />
                  </AuthorLink>
                </div>

                {/* NFT Preview */}
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="#"><i className="fa fa-facebook fa-lg" /></a>
                        <a href="#"><i className="fa fa-twitter fa-lg" /></a>
                        <a href="#"><i className="fa fa-envelope fa-lg" /></a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage || "/images/default-nft.png"}
                      className="lazy nft__item_preview"
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </Link>
                </div>

                {/* NFT Info */}
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title || "Untitled"}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart" />
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
