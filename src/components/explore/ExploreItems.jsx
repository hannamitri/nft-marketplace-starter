import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../CountDown";

const ExploreItems = () => {
  const [exploreData, setExloreData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);

  async function fetchExploreData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExloreData(data);
    setOriginalData(data);
    setLoading(false);
  }

  const loadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 4, exploreData.length));
  };

  function filterNfts(filter) {
    setLoading(true);
    setTimeout(() => {
      if (filter === "price_low_to_high") {
        setExloreData(exploreData.slice().sort((a, b) => a.price - b.price));
      } else if (filter === "price_high_to_low") {
        setExloreData(exploreData.slice().sort((a, b) => b.price - a.price));
      } else if (filter === "likes_high_to_low") {
        setExloreData(exploreData.slice().sort((a, b) => b.likes - a.likes));
      } else if (filter === "default") {
        setExloreData(originalData);
      }
      setLoading(false);
    }, 250);
  }

  useEffect(() => {
    fetchExploreData();
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue="default"
          onChange={(event) => filterNfts(event.target.value)}
        >
          <option value="default">Default</option>
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
              <div className="nft__item__skeleton shimmer">
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
                </div>
              </div>
            </div>
          ))}
          <div className="col-md-12 text-center">
            <button className="btn-main lead">Load More</button>
          </div>
        </>
      ) : (
        <>
          {exploreData.slice(0, visibleCount).map((item, index) => (
            <div
              key={index}
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
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}

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
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
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
            {visibleCount < exploreData.length && (
              <button onClick={loadMore} className="btn-main lead">
                Load More
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ExploreItems;
