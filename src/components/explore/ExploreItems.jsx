import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatCountdown } from "../utils/FormatCountdown";

const ExploreItems = () => {
  const [exploreData, setExploreData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("");
  
  async function getExploreData(selectedFilter) {
    try{
      setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedFilter}`
    );
    console.log("ExplorePageData:", data);
    setExploreData(data);
    }
    catch {
      console.log("Error Fetching API Data");
    }
    finally {
      setLoading(false);
    }  
  }

  function explorePageSkeleton() {
    return new Array(visibleCount).fill(0).map((_, index) => (
      <div
        key={index}
        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        style={{ display: "block", backgroundSize: "cover" }}
      >
        <div className="nft__item--skeleton">
          <div className="nft__explore--skeleton skeleton-box" style={{width: "100%", height: "300px"}}></div>
        </div>
      </div>
    ));
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
    setVisibleCount(8);
  }

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
    }, 500);
  }

  useEffect(() => {
    getExploreData(filter);
  }, [filter]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      
      {!loading ? (
        <>
          {exploreData.slice(0, visibleCount).map((nft, id) => (
            <div
              key={id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${nft.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={nft.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">{formatCountdown(nft.expiryDate, now)}</div>

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
                    <img
                      src={nft.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{nft.title}</h4>
                  </Link>
                  <div className="nft__item_price">{nft.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{nft.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        explorePageSkeleton()
      )}

      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={handleLoadMore}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
