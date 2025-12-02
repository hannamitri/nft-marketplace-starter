import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useFetch from "../UI/apiFetch";
import CountdownTimer from "../UI/countdownTimer";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [filterValue, setFilterValue] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);
  
  const apiUrl = useMemo(() => 
    filterValue 
      ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
      : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
  , [filterValue]);
  
  const { data, loading } = useFetch(apiUrl);

  const loadMore = () => {
    setVisibleItems(prevVisible => prevVisible + 4);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    setVisibleItems(8);
  };

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
            <Skeleton width="100%" height="400px" />
          </div>
        ))
      ) : (
        data && data.slice(0, visibleItems).map((explore, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ 
              display: "block", 
              backgroundSize: "cover",
              animation: `fadeIn 0.8s ease-in ${index * 0.1}s both`
            }}
          >
            <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${explore.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={explore.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <CountdownTimer expiryDate={explore.expiryDate} />

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
              <Link to={`/item-details/${explore.nftId}`}>
                <img src={explore.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${explore.nftId}`}>
                <h4>{explore.title}</h4>
              </Link>
              <div className="nft__item_price">{explore.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{explore.likes}</span>
              </div>
            </div>
          </div>
        </div>
        ))
      )}
      {!loading && data && visibleItems < data.length && (
        <div className="col-md-12 text-center">
          <button onClick={loadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
