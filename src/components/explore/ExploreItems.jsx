import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";
import AOS from "aos"; // Imported cleanly!

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [filter, setFilter] = useState(""); 

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        setLoading(true);
        const url = filter 
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
          : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response error");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching filtered explore items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [filter]); 

  // 1. ADD THIS EFFECT: Force AOS to recalculate DOM elements whenever loading finishes or more items load
  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading, visibleCount]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setVisibleCount(4);
  };

  return (
    <>
      {/* 1. FILTER DROPDOWNS SECTION */}
      <div className="col-md-12">
        <div className="items_filter">
          <div className="dropdownSelect d-inline-block">
            <select 
              id="filter_select" 
              name="filter_select" 
              value={filter}
              onChange={handleFilterChange} 
              className="form-control"
              style={{ padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}
            >
              <option value="">Default Sorting</option>
              <option value="price_low_to_high">Price, Low to High</option>
              <option value="price_high_to_low">Price, High to Low</option>
              <option value="likes_high_to_low">Most Liked</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. SKELETON LOADING STATE */}
      {loading ? (
        new Array(8).fill(0).map((_, index) => (
          <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index} style={{ display: "block" }}>
            <div className="nft__item">
              <div className="author_list_pp">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
              </div>
              <div className="nft__item_wrap">
                <Skeleton width="100%" height="225px" borderRadius="8px" />
              </div>
              <div className="nft__item_info" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <Skeleton width="60%" height="18px" borderRadius="4px" />
                <Skeleton width="40%" height="14px" borderRadius="4px" />
              </div>
            </div>
          </div>
        ))
      ) : (
        
        /* 3. DYNAMIC LIVE EXPLORE CARDS */
        /* 3. DYNAMIC LIVE EXPLORE CARDS */
        items.slice(0, visibleCount).map((item) => (
          <div 
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" 
            key={item.id} 
            style={{ display: "block" }}
            
            // SWAP FADE-UP TO PURE FADE HERE:
     
          >
            <div className="nft__item">
               {/* Rest of card template left intact */}
              
              <div className="author_list_pp">
                <Link to={`/author/${item.authorId}`}>
                  <img className="lazy" src={item.authorImage} alt="Author" />
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
                      <a href="" target="_blank" rel="noreferrer"><i className="fa fa-facebook fa-lg"></i></a>
                      <a href="" target="_blank" rel="noreferrer"><i className="fa fa-twitter fa-lg"></i></a>
                      <a href=""><i className="fa fa-envelope fa-lg"></i></a>
                    </div>
                  </div>
                </div>
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

      {/* 4. PAGINATION: LOAD MORE BUTTON */}
      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center" style={{ display: "block", width: "100%", margin: "20px auto" }}>
          <button 
            id="loadmore" 
            className="btn-main lead" 
            onClick={loadMore}
            style={{ padding: "10px 30px", fontSize: "16px", minWidth: "150px" }}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;