import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Countdown from "../Countdown";
import SkeletonCard from "../UI/SkeletonCard";

const ExploreItems = () => {

  const [exploreItems, setExploreItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  
    async function getExplore() {
      try {
        setIsLoading(true);
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`)
      console.log("Fetch explore items:", data)
     

      setTimeout(() => {
         setExploreItems(data);
        setIsLoading(false);
      }, 3000);

    } catch (err) {
      console.error("Error fetching explore items:", err);
    }
  }

    useEffect(() => {
        window.scrollTo(0, 0);
        getExplore();
      }, []);

      const sortedItems = [...exploreItems].sort((a, b) => {
        if (filter === "price_low_to_high") {
          return (a.price - b.price)
        }

        if (filter === "price_high_to_low") {
          return (b.price - a.price)
        }

        if (filter === "likes_high_to_low") {
          return (b.likes - a.likes)
        }
        return 0;
      }
      );

    
    const handleLoadMore = () => {
      setVisibleCount((prev) => prev + 4);
    }

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

    {isLoading &&
  Array(visibleCount)
    .fill(0)
    .map((_, index) => (
      <div
              key={`skeleton-${index}`}
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
            >
              <SkeletonCard />
            </div>
    ))}

      {!isLoading && sortedItems.slice(0, visibleCount).map((exploreItem) => (
        <div
          key={exploreItem.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${exploreItem.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={exploreItem.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {exploreItem.expiryDate && (
            <div className="de_countdown">
              <Countdown expiryDate={exploreItem.expiryDate}  />
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
              <Link to={`/item-details/${exploreItem.nftId}`}>
                <img src={exploreItem.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${exploreItem.nftId}`}>
                <h4>{exploreItem.title}</h4>
              </Link>
              <div className="nft__item_price">{exploreItem.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{exploreItem.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {!isLoading && visibleCount < exploreItems.length && (
      <div className="col-md-12 text-center">
        <button onClick={handleLoadMore} id="loadmore" className="btn-main lead">
          Load more
        </button>
      </div>
      )}

     
    </>
  );
};

export default ExploreItems;
