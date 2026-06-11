import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [filter, setFilter] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());

  async function fetchExploreItems(filterValue = "") {
    setLoading(true);

    const response = await fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
        filterValue ? `?filter=${filterValue}` : ""
      }`
    );

    const data = await response.json();

    setTimeout(() => {
      setItems(data);
      setVisibleItems(8);
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    fetchExploreItems(filter);
  }, [filter]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function formatTimeLeft(expiryDate) {
    const timeLeft = expiryDate - currentTime;

    if (timeLeft <= 0) {
      return "0h 0m 0s";
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          >
            <div className="nft__item">Loading...</div>
          </div>
        ))
      ) : (
        items.slice(0, visibleItems).map((item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to="/author"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
                {item.expiryDate > currentTime && (
               <div className="de_countdown">
               {formatTimeLeft(item.expiryDate)}
        </div>
)}

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                  </div>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>

                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
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
        ))
      )}

      {!loading && visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleItems(visibleItems + 4)}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
