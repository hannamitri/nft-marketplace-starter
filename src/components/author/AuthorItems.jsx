import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const AuthorItems = ({ items, loading, author }) => {
  const shimmer = {
    background: "linear-gradient(90deg,#eee 25%,#ddd 37%,#eee 63%)",
    backgroundSize: "400% 100%",
    animation: "shimmer 1.4s infinite",
  };

  const SkeletonCard = () => (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item">
        <div style={{ width: "100%", height: 200, ...shimmer }} />
        <div style={{ padding: 10 }}>
          <div
            style={{ height: 14, width: "60%", marginBottom: 10, ...shimmer }}
          />
          <div style={{ height: 12, width: "40%", ...shimmer }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {/* ===== LOADING ===== */}
          {loading &&
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}

          {/* ===== DATA ===== */}
          {!loading &&
            items.map((item) => (
              <Link
                to={`/item-details/${item.nftId}`}
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item.nftId}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img className="lazy" src={author?.authorImage || AuthorImage} alt={author?.authorName} />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
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
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;