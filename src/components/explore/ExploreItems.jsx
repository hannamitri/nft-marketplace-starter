import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Countdown = ({ itemId }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const endTime = new Date().getTime() + 6 * 60 * 60 * 1000 + itemId * 100000;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        setTimeLeft("Expired");
        clearInterval(timer);
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

      const minutes = Math.floor((difference / (1000 * 60)) % 60);

      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [itemId]);

  return <div className="de_countdown">{timeLeft}</div>;
};

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((response) => response.json())
      .then((data) => setExploreItems(data))
      .finally(() => setIsLoading(false));
  }, []);

  function filterNft(filter) {
    if (filter === "price_low_to_high") {
      setExploreItems(exploreItems.slice().sort((a, b) => a.price - b.price));
    }
    if (filter === "price_high_to_low") {
      setExploreItems(exploreItems.slice().sort((a, b) => b.price - a.price));
    }
    if (filter === "likes_high_to_low") {
      setExploreItems(exploreItems.slice().sort((a, b) => b.likes - a.likes));
    }
  }

  function loadMore() {
    setVisibleItems(visibleItems + 4);
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterNft(event.target.value)}
          data-aos="fade-down"
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading ? (
        <div className="row">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={item}>
              <div className="nft_coll skeleton-card"></div>
            </div>
          ))}
        </div>
      ) : (
        exploreItems.slice(0, visibleItems).map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
            data-aos="fade-up"
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate && <Countdown itemId={item.expiryDate} />}

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <button className="fa fa-facebook fa-lg">
                        <i className="fa fa-facebook fa-lg"></i>
                      </button>
                      <Link to="" className="fa fa-twitter fa-lg">
                        <i className="fa fa-twitter fa-lg"></i>
                      </Link>
                      <button >
                        <i className="fa fa-envelope fa-lg"></i>
                      </button>
                    </div>
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

      <div className="col-md-12 text-center">
        <button id="loadmore" className="btn-main lead" onClick={loadMore}>
          Load More
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
