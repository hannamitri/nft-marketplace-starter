import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const Countdown = ({ expiryDate }) => {
  const calculateRemaining = () => Math.max(0, Number(expiryDate) - Date.now());
  const [remaining, setRemaining] = useState(calculateRemaining);

  useEffect(() => {
    setRemaining(calculateRemaining());

    const interval = setInterval(() => {
      setRemaining(calculateRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (remaining <= 0) {
    return <div className="de_countdown">Expired</div>;
  }

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  return (
    <div className="de_countdown">
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    let cancelled = false;

    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        setVisibleCount(8);

        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore", {params: filter ? { filter } : {}});

        if (!cancelled) {
          setItems(response.data);
        }
      } catch(error) {
        console.error("Error fetching explore items:", error);

        if (!cancelled) {
          setError("Unable to load items.");
          setItems([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchItems();

    return () => {
      cancelled = true;
    };
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleLoadMore = () => {
    setVisibleCount((previous) => Math.min(previous + 4, items.length));
  };

  const visibleItems = items.slice(0, visibleCount);

  return (
    <>
      <div className="col-md-12">
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading && new Array(8).fill(0).map((_,index) => (
        <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block", backgroundSize: "cover" }}>
          <div className="nft__item">
            <div className="author_list_pp">
              <Skeleton width="45px" height="45px" borderRadius="50%" />
            </div>

            <Skeleton width="85px" height="25px" borderRadius="20px" />

            <div className="nft__item_wrap">
              <Skeleton width="100%" height="200px" borderRadius="8px" />
            </div>

            <div className="nft__item_info">
              <Skeleton width="120px" height="18px" />

              <div className="nft__item_price">
                <Skeleton width="65px" height="15px" />
              </div>

              <div className="nft__item_like">
                <Skeleton width="35px" height="15px" />
              </div>
            </div>
          </div>
        </div>
      ))}

      {!loading && error && (
        <div className="col-md-12 text-center">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="col-md-12 text-center">
          <p>No items found.</p>
        </div>
      )}

      {!loading && !error && visibleItems.map((item) => (
        <div key={item.id} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block", backgroundSize: "cover" }}>
          <div className="nft__item">
            <div className="author_list_pp">
              <Link to={`/author/${item.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top">
                <img className="lazy" src={item.authorImage} alt="Author" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {item.expiryDate && (
              <Countdown expiryDate={item.expiryDate} />
            )}

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button type="button">Buy Now</button>

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
              </div>

              <Link to="/item-details">
                <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
              </Link>
            </div>

            <div className="nft__item_info">
              <Link to="/item-details">
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

      {!loading && !error && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button type="button" id="loadmore" className="btn-main lead" onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;