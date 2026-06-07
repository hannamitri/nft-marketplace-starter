import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton"; 

const SkeletonLoader = () => {
  return (
    <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block", backgroundSize: "cover" }}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton width="50px" height="50px" borderRadius="50%" /> {/* Author image placeholder */}
          <i className="fa fa-check"></i>
        </div>
        <div className="de_countdown">
          <div style={{marginTop: '7px'}}>
            <Skeleton width="100px" height="20px" />
          </div> {/* Countdown placeholder */}
        </div>
        <div className="nft__item_wrap">
          <Skeleton width="100%" height="200px" borderRadius="10px" /> {/* NFT item image placeholder */}
        </div>
        <div className="nft__item_info">
          <Skeleton width="80%" height="20px" /> {/* Title placeholder */}
          <Skeleton width="60%" height="20px" /> {/* Price placeholder */}
          <div className="nft__item_like">
            <Skeleton width="30px" height="20px" /> {/* Likes placeholder */}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [displayCount, setDisplayCount] = useState(8);

  useEffect(() => {
    const controller = new AbortController();
    const fetchItems = async () => {
      setLoading(true);
      try {
        const filterParam = filter ? `?filter=${filter}` : "";
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filterParam}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load items. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
    return () => controller.abort();
  }, [filter]);

  const loadMore = () => {
    setLoadingMore(true); 
    setTimeout(() => {
      setDisplayCount(displayCount + 4); 
      setLoadingMore(false); 
    }, 1000); 
  };

  return (
    <>
      <div>
        <select
         id="filter-items" 
         defaultValue=""
         onChange={(e) => setFilter(e.target.value)}
         >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        Array.from({ length: displayCount }).map((_, index) => <SkeletonLoader key={index} />)
      ) : (
        items.slice(0, displayCount).map((item) => (
          <div key={item.id} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block", backgroundSize: "cover" }}>
            <div className="nft__item">
              <div className="author_list_pp">
                <Link to={`/author/${item.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top">
                  <img className="lazy" src={item.authorImage || AuthorImage} alt={item.authorName} />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate > Date.now() && (
              <div className="de_countdown">
                <CountdownTimer expiryDate={item.expiryDate} />
              </div>
              )}
              <div className="nft__item_wrap">
                <Link to={`/item-details/${item.nftId}`}>
                  <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
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
      {loadingMore ? (
        Array.from({ length: 4 }).map((_, index) => <SkeletonLoader key={index} />)
      ) : (
        displayCount < items.length && (
          <div className="col-md-12 text-center">
            <button onClick={loadMore} className="btn-main lead">
              Load More
            </button>
          </div>
        )
      )}
    </>
  );
};

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(expiryDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return timeLeft > 0 ? <span>{formatTime(timeLeft)}</span> : null;
};

export default ExploreItems;
