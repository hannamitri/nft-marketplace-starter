import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Countdown from "../Countdown";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {

  const [ exploreItems, setExploreItems ] = useState([]);

  const [ loading, setLoading ] = useState(true);

  const [ visibleItems, setVisibleItems ] = useState(8);

  const [ filter, setFilter ] = useState("");

useEffect(function () {
  setLoading(true);
  setVisibleItems(8);
  fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
  .then(function (response) {
    return response.json();
  })
    .then(function (data) {
    setTimeout(function () {
      setExploreItems(data);
      setLoading(false);
    }, 2000);
  });
}, [filter]);

  return (
    <>
      <div>
        <select 
        id="filter-items" 
        value={filter}
        onChange={(event) => setFilter(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
              </div>
             {loading ? (
              <>
  {new Array(8).fill(0).map((_, index) => (
    <div
  key={index}
  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
  style={{ display: "block", backgroundSize: "cover" }}
>
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton
            width="48px"
            height="48px"
            borderRadius="50%"
          />
        </div>
        <div className="nft__item_wrap">
          <Skeleton
            width="100%"
            height="250px"
            borderRadius="8px"
          />
        </div>
        <div className="nft__item_info">
          <Skeleton
            width="75%"
            height="20px"
            borderRadius="4px"
          />
          <Skeleton
            width="40%"
            height="16px"
            borderRadius="4px"
          />
        </div>
      </div>
    </div>
  ))}
</>
             ) : (
      exploreItems.slice(0, visibleItems).map((exploreItem) => (
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
                <Countdown expiryDate={exploreItem.expiryDate} />
                    )}
            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="https://www.gmail.com/" target="_blank" rel="noreferrer">
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
              <Link to="/item-details">
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
      ))
    )}
      {!loading && visibleItems < exploreItems.length && (
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" 
        onClick={() => 
        setVisibleItems(
          visibleItems === 8 ? 12 : exploreItems.length)}>
          Load more
        </Link>
      </div>
      )}
    </>
  );
};

export default ExploreItems;
