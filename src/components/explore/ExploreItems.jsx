import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const ExploreItems = () => {
   const [explore, setExplore] = useState([]);
   const [visibleCount, setVisibleCount] = useState(8);
   const [isLoading, setIsLoading] = useState(true);
   const ITEMS_PER_PAGE = 4;

   function filterItems(filter) {
     if (filter === "") {
       return;
     }

     const sortedItems = [...explore];

     if (filter === "price_low_to_high") {
       sortedItems.sort((a, b) => a.price - b.price);
     } else if (filter === "price_high_to_low") {
       sortedItems.sort((a, b) => b.price - a.price);
     } else if (filter === "likes_high_to_low") {
       sortedItems.sort((a, b) => b.likes - a.likes);
     }

     setExplore(sortedItems);
   } 

   const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  useEffect(() => {
    const fetchExploreItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
        const data = await response.json();
        setExplore(data);
      } catch (error) {
        console.error("Error fetching explore items:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExploreItems();
  }, []);

  const visibleItems = explore.slice(0, visibleCount);

  return (
    <>
      <div>
        <select 
          id="filter-items" 
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {isLoading ? (
        // Render Skeletons while loading
        new Array(8).fill(0).map((_, index) => (
          <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="nft__item">
              <Skeleton height={400} />
            </div>
          </div>
        ))
      ) : (
        // Render actual items once loaded
        visibleItems.map((item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link to="/author" data-bs-toggle="tooltip" data-bs-placement="top">
                  <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className="de_countdown">5h 30m 32s</div>

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4 data-aos="fade-left">Share</h4>
                      <a href="/" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="/" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="/">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to="/item-details">
                  <img src={item.nftImage || nftImage} className="lazy nft__item_preview" alt="" />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4>{item.title || "Pinky Ocean"}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes || 69}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {visibleCount < explore.length && (
        <div className="col-md-12 text-center">
          <button onClick={handleLoadMore} id="loadmore" className="btn-main lead" style={{ padding: '10px 20px', cursor: 'pointer'}}>
            Load More  
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
