import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ExploreItemSkeleton from "../UI/ExploreItemSkeleton";
import CountdownTimer from "./CountdownTimer";

const ExploreItems = () => {
  const [displayItems, setDisplayItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedFilter, setSelectedFilter] = useState("");

  async function fetchItems(filter = "") {
    try {
      setLoading(true);

      const url = filter
        ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;

      const { data } = await axios.get(url);

      console.log("Explore API Data:", data);
      console.log(
        "Author IDs:",
        data.map((item) => item.authorId)
      );

      setDisplayItems(data);
      setVisibleCount(8);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function loadMore() {
    setVisibleCount((prev) => prev + 4);
  }


  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={selectedFilter}
          onChange={(e) => {
            const filter = e.target.value;
            setSelectedFilter(filter);
            fetchItems(filter);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      <div className="row">
        {loading
          ? new Array(visibleCount).fill(0).map((_, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              >
                {" "}
                <ExploreItemSkeleton />
              </div>
            ))
          : displayItems.slice(0, visibleCount).map((item) => (
            <div
                key={item.id}
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
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
                  {item.expiryDate > Date.now() && (
                    <div className="de_countdown">
                    <CountdownTimer endTime={item.expiryDate} />
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
                    <Link to="/item-details">
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
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
      </div>
      <div className="col-md-12 text-center">
        <button id="loadmore" className="btn-main lead" onClick={loadMore}>
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
