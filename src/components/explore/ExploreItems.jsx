import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("");
  const [timeNow, setTimeNow] = useState(Date.now());

  useEffect(() => {
    const fetchExploreItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
            filter ? `?filter=${filter}` : ""
          }`
        );
        const data = await response.json();
        console.log("EXPLORE DATA:", data);
        setItems(data);
      } catch (error) {
        console.log("EXPLORE ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [filter]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCountdown = (expiryDate) => {
    const distance = expiryDate - timeNow;

    if (distance <= 0) {
      return "Ended";
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setVisibleCount(8);
  };

  if (loading) {
    return (
      <div className="row">
        <div className="col-md-12 mb30">
          <select id="filter-items" defaultValue="">
            <option value="">Default</option>
          </select>
        </div>

        {new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          >
            <div className="nft__item" data-aos="fade-up">
              <div
                style={{
                  background: "#eee",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginBottom: "12px",
                }}
              ></div>

              <div
                style={{
                  background: "#eee",
                  width: "100px",
                  height: "28px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              ></div>

              <div
                style={{
                  background: "#eee",
                  width: "100%",
                  height: "250px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              ></div>

              <div
                style={{
                  background: "#eee",
                  width: "60%",
                  height: "22px",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              ></div>

              <div
                style={{
                  background: "#eee",
                  width: "40%",
                  height: "18px",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-12 mb30">
        <select
          id="filter-items"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {items.slice(0, visibleCount).map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Creator: ${item.title}`}
              >
                <img
                  className="lazy"
                  src={item.authorImage}
                  alt={item.title}
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            <div className="de_countdown">{getCountdown(item.expiryDate)}</div>

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

              <Link to={`/item-details/explore/${item.id}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt={item.title}
                />
              </Link>
            </div>

            <div className="nft__item_info">
              <Link to={`/item-details/explore/${item.id}`}>
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

      {visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreItems;