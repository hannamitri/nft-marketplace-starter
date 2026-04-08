import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../../components/Skeleton";

const ExploreItems = ({ items = [], loading = false }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (expiryDate) => {
    if (!expiryDate) return null;

    const distance = expiryDate - now;

    if (distance <= 0) return "Ended";

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <>
        {[...Array(8)].map((_, index) => (
          <div
            className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
            key={index}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <div
                  className="skeleton skeleton-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>

              <div
                className="skeleton skeleton-text short"
                style={{
                  width: "120px",
                  height: "24px",
                  marginBottom: "12px",
                }}
              ></div>

              <div className="nft__item_wrap">
                <div
                  className="skeleton skeleton-img"
                  style={{
                    width: "100%",
                    height: "280px",
                    borderRadius: "8px",
                  }}
                ></div>
              </div>

              <div className="nft__item_info" style={{ marginTop: "12px" }}>
                <div
                  className="skeleton skeleton-text short"
                  style={{ height: "22px", marginBottom: "10px" }}
                ></div>
                <div
                  className="skeleton skeleton-text"
                  style={{
                    height: "18px",
                    width: "90px",
                    marginBottom: "10px",
                  }}
                ></div>
                <div
                  className="skeleton skeleton-text"
                  style={{ height: "18px", width: "70px" }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {items.map((item, index) => {
        const countdown = formatCountdown(item.expiryDate);

        return (
          <div
            className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
            key={item.nftId || item.nft_id || item.id || index}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId || item.author_id}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={`Creator: ${item.title}`}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <Skeleton
                      src={item.authorImage || item.author_image}
                      alt="author"
                      className="lazy pp-author"
                      wrapperStyle={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              {countdown && <div className="de_countdown">{countdown}</div>}

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>

                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <Link to={`/item-details/${item.nftId || item.nft_id}`}>
                  <Skeleton
                    src={item.nftImage || item.nft_image}
                    alt={item.title}
                    className="lazy nft__item_preview"
                    wrapperStyle={{
                      height: "280px",
                      borderRadius: "8px",
                    }}
                  />
                </Link>
              </div>

              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId || item.nft_id}`}>
                  <h4>{item.title}</h4>
                </Link>

                <div className="nft__item_price">
                  {Number(item.price).toFixed(2)} ETH
                </div>

                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ExploreItems;
