import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UseCountdown from "../UI/UseCountdown";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(8);
  const [loading, setLoading] = useState(true);

  async function fetchExploreItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );
    console.log(data);
    setItems(data);
    setLoading(false);
  }

  function showMoreItems() {
    setVisible((prevValue) => prevValue + 4);
  }

  const CountdownDisplay = ({ expiryDate }) => {
    const timeLeft = UseCountdown(expiryDate);
    return timeLeft;
  };

  async function applyFilter(filter) {
    const filterEndpoints = {
      price_low_to_high: "price_low_to_high",
      price_high_to_low: "price_high_to_low",
      likes_high_to_low: "likes_high_to_low",
    };
    if (filterEndpoints[filter]) {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterEndpoints[filter]}`
      );
      setItems(data);
    } else {
      console.error("Invalid filter:", filter);
    }
  }

  useEffect(() => {
    fetchExploreItems();
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => applyFilter(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div
                className="skeleton-box"
                style={{
                  width: "100%",
                  height: "400px",
                }}
              ></div>
            </div>
          ))
        : items.slice(0, visible).map((item) => (
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
                <div className="de_countdown">
                  <CountdownDisplay expiryDate={item.expiryDate} />
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
                  <Link to={`/item-details/${item.nftId}`}>
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

      <div className="col-md-12 text-center">
        {visible >= items.length ? (
          <p>No more items to load</p>
        ) : (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={showMoreItems}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
