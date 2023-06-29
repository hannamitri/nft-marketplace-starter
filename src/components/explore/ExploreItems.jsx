import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TimerCountDown from "../UI/TimerCountDown";
import Skeleton from "../UI/Skeleton";
const API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
const ExploreItems = () => {
  const [filter, setFilter] = useState("");
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numLoaded, setNumLoaded] = useState(8);

  async function fetchData(apiURL) {
    const { data } = await axios.get(apiURL || API);
    setExploreItems(data);
    setIsLoading(false);
  }

  async function filterNFTs() {
    setIsLoading(true);
    let filterAPI =
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    if (filter === "price_low_to_high") {
      filterAPI += "?filter=price_low_to_high";
    } else if (filter === "price_high_to_low") {
      filterAPI += "?filter=price_high_to_low";
    } else if (filter === "likes_high_to_low") {
      filterAPI += "?filter=likes_high_to_low";
    }
    fetchData(filterAPI);
  }

  const displayMore = () => {
    if (numLoaded + 4 <= exploreItems.length) {
      setNumLoaded(numLoaded + 4);
    }
  };

  const selectFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    filterNFTs();
  }, [filter]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={selectFilter}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading
        ? new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width={50} height={50} borderRadius={100} />
                  <i className="fa fa-check"></i>
                </div>

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

                  <Skeleton width="100%" height={320} />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="50%" height={25} />
                  <div className="nft__item_price">
                    <Skeleton width="25%" height={20} />
                  </div>
                  <div className="nft__item_like">
                    <span>
                      <Skeleton width={35} height={15} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : exploreItems.slice(0, numLoaded).map((item) => (
            <div
              key={item.id}
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
                <TimerCountDown expiryDate={item.expiryDate} />

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
        <button id="loadmore" className="btn-main lead" onClick={displayMore}>
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
