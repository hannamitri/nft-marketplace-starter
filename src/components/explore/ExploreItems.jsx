import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CountdownTimer from "../UI/CountdownTimer";
import Skeleton from "react-loading-skeleton";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMoreItems, setLoadMoreItems] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchExploreItems(filter);
  }, [filter]);

  async function fetchExploreItems(filter = "") {
    setLoading(true);
    try {
      let url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`;

      const { data } = await axios.get(url);
      setExploreItems(data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  }

  const filterChange = (event) => {
    setFilter(event.target.value);
  };

  const loadItems = () => {
    setLoadMoreItems((prevCount) => prevCount + 4);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={filterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(4).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton height={400} width={"100%"} />
            </div>
          ))
        : exploreItems.slice(0, loadMoreItems).map((exploreItems, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${exploreItems.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img
                      className="lazy"
                      src={exploreItems.authorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {exploreItems.expiryDate && (
                  <div className="de_countdown">
                    <CountdownTimer expiryDate={exploreItems.expiryDate} />
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
                  <Link to={`/item-details/${exploreItems.nftId}`}>
                    <img
                      src={exploreItems.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${exploreItems.nftId}`}>
                    <h4>{exploreItems.title}</h4>
                  </Link>
                  <div className="nft__item_price">
                    {exploreItems.price} ETH
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{exploreItems.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        {loadMoreItems < exploreItems.length && (
          <button onClick={loadItems} className="btn-main lead">
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
