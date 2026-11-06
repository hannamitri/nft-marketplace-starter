import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const tilesData = [
  { id: 1, title: 'Title 1' },
  { id: 2, title: 'Title 2' },
  { id: 3, title: 'Title 3' },
  { id: 4, title: 'Title 4' },
  { id: 5, title: 'Title 5' },
  { id: 6, title: 'Title 6' },
  { id: 7, title: 'Title 7' },
  { id: 8, title: 'Title 8' },
  { id: 9, title: 'Title 9' },
  { id: 10, title: 'Title 10' },
  { id: 11, title: 'Title 11' },
  { id: 12, title: 'Title 12' },
  { id: 13, title: 'Title 13' },
  { id: 14, title: 'Title 14' },
  { id: 15, title: 'Title 15' },
  { id: 16, title: 'Title 16' },
];

const ExploreItems = ({ loading: propLoading = false }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const skeletonItems = Array.from({ length: 8 });
  const [visibleCount, setVisibleCount] = useState(8);
   const [sortType, setSortType] = useState('default');

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (error) return <p>Error: {error}</p>;

  function Countdown({ expiryDate }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
      const updateCountdown = () => {
        const difference = Number(expiryDate) - Date.now();

        if (difference <= 0) {
          setTimeLeft("EXPIRED");
          return;
        }

        const hours = Math.floor(difference / 3600000);
        const minutes = Math.floor((difference / 60000) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      };

      updateCountdown();

      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }, [expiryDate]);

    return <div className="de_countdown">{timeLeft}</div>;
  }

  function sortData(sortType, data) {
    let sortedData = [...data];

    if (sortType === "price_low_to_high") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortType === "price_high_to_low") {
      sortedData.sort((a, b) => b.price - a.price);
    } else if (sortType === "likes_high_to_low") {
      sortedData.sort((a, b) => b.likes - a.likes);
    }

    return sortedData;
  }

  return (
    <>
      <div>
        <select id="filter-items" value={sortType} onChange={(event) => setSortType(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {propLoading || isLoading ? (
        skeletonItems.map((_, index) => (
          <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="nft_item">
              <Skeleton width="100%" height="180px" borderRadius="12px" />
            </div>
            <div className="author_list_pp">
              <Skeleton width="60px" height="60px" borderRadius="50%" />
            </div>
            <div className="nft_item_wrap">
              <Skeleton width="70%" height="20px" borderRadius="6px" />
              <Skeleton width="40%" height="16px" borderRadius="6px" />
            </div>
          </div>
        ))
      ) : (
        <>
          {data.map((item) => (
            <div
              key={item.id}
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
                    <img src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Countdown expiryDate={item.expiryDate} />
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
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
                    <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
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
          <div className="col-md-12 text-center">
            {visibleCount < data.length && (
              <Link
                to=""
                id="loadmore"
                className="btn-main lead"
                onClick={handleLoadMore}
                style={{ marginTop: "20px" }}
              >
                Load more
              </Link>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ExploreItems;
