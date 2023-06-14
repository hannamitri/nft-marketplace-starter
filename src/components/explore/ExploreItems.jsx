import React, { useEffect, useState, Component } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Timer from "../UI/Timer";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(8);
  const [filter, setFilter] = useState(""); 

  async function fetchExploreItems(filter = '') {
    const res = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );
    const { data } = res;
    setExploreItems(data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchExploreItems(filter);
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    fetchExploreItems(e.target.value);
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
      {isLoading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <div
                    className="skeleton__author_list_pp"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "lightgray",
                    }}
                  ></div>

                  <div className="lazy"></div>
                  <i className="fa fa-check"></i>
                </div>
                <div className="de_countdown"></div>

                <div className="nft__item_wrap">
                  <div
                    className="skeleton__wrap"
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "lightgray",
                    }}
                  >
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <div className="nft__item_share"></div>
                      </div>
                    </div>
                    <div className="lazy nft__item_preview"></div>
                  </div>
                </div>
                <div className="nft__item_info">
                  <div className="nft__item_price"></div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                  </div>
                </div>
              </div>
            </div>
          ))
        : exploreItems.slice(0, loadMore).map((nft) => (
            <div
              key={nft.nftId}
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
                    <img className="lazy" src={nft.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {nft.expiryDate && <Timer nft={nft} />}

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
      <div className="col-md-12 text-center">
        <Link
          to=""
          id="loadmore"
          className="btn-main lead"
          onClick={() => setLoadMore((prevCount) => prevCount + 4)}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
