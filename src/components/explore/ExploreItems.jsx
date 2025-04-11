import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExploreItems, getFilterItems } from "../../api/api";
import SkeletonLoader from "../home/SkeletonLoader";

const ExploreItems = () => {
  const [filter, setFilter] = useState("");
  const [filteredCollections, setFilteredCollections] = useState([]);
   const [collections, setCollections] = useState([]);
   const [visibleItems, setVisibleItems] = useState(8);
   const [loading, setLoading] = useState(true);
   const [countdowns, setCountdowns] = useState({});
   

   useEffect(() => {
    const fetchCollections = async () => {
      const data = await getExploreItems();
      setCollections(data);
      setLoading(false);
    };

    fetchCollections();
  }, []);

  const loadMore = () => {
    setVisibleItems(prev => prev + 8);
  };

  const handleFilterChange = async (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    if (selectedFilter) {
      const filteredData = await getFilterItems(selectedFilter);
      setFilteredCollections(filteredData);
    } else {
      setFilteredCollections([]);
    }
  };

   useEffect(() => {
      const interval = setInterval(() => {
        const newCountdowns = collections.reduce((acc, collection) => {
          const timeLeft = calculateTimeLeft(collection.expiryDate);
          acc[collection.id] = timeLeft;
          return acc;
        }, {});
        setCountdowns(newCountdowns);
      }, 1000);

      return () => clearInterval(interval);
    }, [collections]);
  
    const calculateTimeLeft = (expiryDate) => {
      const difference = +new Date(expiryDate) - +new Date();
      let timeLeft = {};
  
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
  
      return timeLeft;
    };

    if (loading) {
      return (
        <section id="section-collections" className="no-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <div className="small-border bg-color-2"></div>
                </div>
              </div>
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <SkeletonLoader />
                  </div>
                ))}
            </div>
          </div>
        </section>
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
      {(filter ? filteredCollections : collections).slice(0, visibleItems).map((collection, index) => (
        
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
                <img className="lazy" src={collection.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {countdowns[collection.id] && 
              (countdowns[collection.id].hours > 0 || 
               countdowns[collection.id].minutes > 0 || 
               countdowns[collection.id].seconds > 0) && (
                <div className="de_countdown">
                  {countdowns[collection.id].hours}h {countdowns[collection.id].minutes}m {countdowns[collection.id].seconds}s
                </div>
              )}

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
                <img src={collection.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{collection.title}</h4>
              </Link>
              <div className="nft__item_price">{collection.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{collection.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {visibleItems < (filter ? filteredCollections.length : collections.length) && (
        <div className="col-md-12 text-center">
          <button 
            onClick={loadMore}
            id="loadmore" 
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
