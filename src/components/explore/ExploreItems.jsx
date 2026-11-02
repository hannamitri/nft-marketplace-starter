import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreItems = ({ data, loading }) => {
  const [timeLeft, setTimeLeft] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [selectedFilter, setSelectedFilter] = useState(""); 

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeLeft = data.map((nft) => {
        const totalSeconds = Math.max(
          (new Date(nft.expiryDate) - Date.now()) / 1000,
          0,
        );
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return { ...nft, timeLeft: { hours, minutes, seconds } };
      });
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [data, loading])
  
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

    const sortedData = [...timeLeft].sort((a, b) => {
    switch (selectedFilter) {
      case "price_low_to_high":
        return a.price - b.price;
      case "price_high_to_low":
        return b.price - a.price;
      case "likes_high_to_low":
        return b.likes - a.likes; 
      default:
        return 0; 
    }
  });

   const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 4); 
  };

  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Explore</h2>
                <div className="small-border bg-color-2"></div>
              </div>
              {/* Skeleton loading state */}
              <div className="skeleton--container">
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <div>
        <select id="filter-items" value={selectedFilter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {sortedData.slice(0, itemsToShow).map((nft, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${nft.id}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={nft.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">{nft.timeLeft.hours}h {nft.timeLeft.minutes}m{" "}
                      {nft.timeLeft.seconds}s</div>

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
              <Link to={`/item-details/${nft.nftId}`}>
                <img
                  src={nft.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${nft.nftId}`}>
                <h4>{nft.title}</h4>
              </Link>
              <div className="nft__item_price">{nft.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>69</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {itemsToShow < sortedData.length && (
      <div className="col-md-12 text-center">
        <button onClick={handleLoadMore} className="btn-main lead">
            Load more
          </button>
      </div>
      )}
    </>
  );
};

export default ExploreItems;
