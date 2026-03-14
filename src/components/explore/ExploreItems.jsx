import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const fetchExploreItems = async (filterParam = '') => {
      try {
        setLoading(true);
        let url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore';
        if (filterParam) {
          url += `?filter=${filterParam}`;
        }
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setExploreItems(data);
      } catch (error) {
        // Fallback data for when API is unavailable
        setExploreItems([
          {
            id: 1,
            title: "Cosmic Warrior #001",
            price: "2.45",
            likes: 87,
            authorId: "0x1234...5678",
            nftId: "nft-001",
            expiryDate: Date.now() + 86400000, // 24 hours from now
            nftImage: null,
            authorImage: null
          },
          {
            id: 2,
            title: "Digital Dreams #042",
            price: "1.89",
            likes: 156,
            authorId: "0x2345...6789",
            nftId: "nft-002",
            expiryDate: Date.now() + 172800000, // 48 hours from now
            nftImage: null,
            authorImage: null
          },
          {
            id: 3,
            title: "Neon Genesis #007",
            price: "3.21",
            likes: 203,
            authorId: "0x3456...7890",
            nftId: "nft-003",
            expiryDate: Date.now() + 259200000, // 72 hours from now
            nftImage: null,
            authorImage: null
          },
          {
            id: 4,
            title: "Pixel Paradise #128",
            price: "0.95",
            likes: 64,
            authorId: "0x4567...8901",
            nftId: "nft-004",
            expiryDate: Date.now() + 345600000, // 96 hours from now
            nftImage: null,
            authorImage: null
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    // Check for filter parameter in URL
    const urlFilter = searchParams.get('filter');
    if (urlFilter) {
      setFilter(urlFilter);
      fetchExploreItems(urlFilter);
    } else {
      fetchExploreItems();
    }
  }, [searchParams]);

  // Update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    
    // Update URL parameters
    if (selectedFilter) {
      setSearchParams({ filter: selectedFilter });
    } else {
      setSearchParams({});
    }
  };

  const formatTimeLeft = (expiryDate) => {
    const timeLeft = expiryDate - currentTime;
    
    if (timeLeft <= 0) {
      return "Expired";
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
  };

  if (loading) {
    return (
      <>
        <div className="col-md-12 text-center">
          <p>Loading explore items...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.map((item, index) => (
        <div
          key={item.id || index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Creator: ${item.authorId}`}
              >
                <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">{formatTimeLeft(item.expiryDate)}</div>

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <button type="button" onClick={() => {/* Share functionality to be implemented */}}>
                      <i className="fa fa-facebook fa-lg"></i>
                    </button>
                    <button type="button" onClick={() => {/* Share functionality to be implemented */}}>
                      <i className="fa fa-twitter fa-lg"></i>
                    </button>
                    <button type="button" onClick={() => {/* Share functionality to be implemented */}}>
                      <i className="fa fa-envelope fa-lg"></i>
                    </button>
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
      ))}
      <div className="col-md-12 text-center">
        <button type="button" id="loadmore" className="btn-main lead" onClick={() => {/* Load more functionality to be implemented */}}>
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
