import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const shimmerStyle = document.createElement('style');
shimmerStyle.textContent = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;
if (!document.querySelector('[data-shimmer-style-explore]')) {
  shimmerStyle.setAttribute('data-shimmer-style-explore', 'true');
  document.head.appendChild(shimmerStyle);
}

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = expiryDate - Date.now();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Expired");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching explore items:", error);
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, []);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setFilter(filterValue);

    let sortedItems = [...items];

    switch (filterValue) {
      case "price_low_to_high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "price_high_to_low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case "likes_high_to_low":
        sortedItems.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }

    setItems(sortedItems);
  };

  const loadMore = () => {
    setVisibleItems((prev) => prev + 4);
  };

  const displayedItems = items.slice(0, visibleItems);
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
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
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <div 
                  style={{ 
                    width: "50px", 
                    height: "50px", 
                    backgroundColor: "#d0d0d0",
                    backgroundImage: "linear-gradient(90deg, #d0d0d0 0%, #e0e0e0 50%, #d0d0d0 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                    borderRadius: "50%",
                    border: "3px solid #fff"
                  }}
                ></div>
              </div>
              <div 
                className="de_countdown" 
                style={{ 
                  backgroundColor: "#d0d0d0",
                  backgroundImage: "linear-gradient(90deg, #d0d0d0 0%, #e0e0e0 50%, #d0d0d0 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                  color: "transparent",
                  borderRadius: "4px",
                  width: "100px",
                  height: "30px"
                }}
              >
                Loading...
              </div>

              <div className="nft__item_wrap">
                <div 
                  style={{ 
                    height: "300px", 
                    backgroundColor: "#d0d0d0",
                    backgroundImage: "linear-gradient(90deg, #d0d0d0 0%, #e0e0e0 50%, #d0d0d0 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                    borderRadius: "8px"
                  }}
                ></div>
              </div>
              <div className="nft__item_info">
                <div 
                  style={{ 
                    height: "24px", 
                    width: "70%", 
                    backgroundColor: "#d0d0d0",
                    backgroundImage: "linear-gradient(90deg, #d0d0d0 0%, #e0e0e0 50%, #d0d0d0 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                    borderRadius: "4px",
                    marginBottom: "10px"
                  }}
                ></div>
                <div 
                  style={{ 
                    height: "20px", 
                    width: "40%", 
                    backgroundColor: "#d0d0d0",
                    backgroundImage: "linear-gradient(90deg, #d0d0d0 0%, #e0e0e0 50%, #d0d0d0 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                    borderRadius: "4px"
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))
      ) : (
        displayedItems.map((item) => (
          <div
            key={item.nftId}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

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
                <Link to={`/item-details/${item.nftId}`}>
                  <img src={item.nftImage || nftImage} className="lazy nft__item_preview" alt={item.title} />
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
          <Link to="" id="loadmore" className="btn-main lead" onClick={(e) => { e.preventDefault(); loadMore(); }}>
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
