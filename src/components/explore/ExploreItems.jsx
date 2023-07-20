import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ExploreItem from "../UI/ExploreItem.jsx";
import Skeleton from "../UI/Skeleton.jsx";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(8);

  function loadMore() {
    if (loaded !== 16) {
      setLoaded(loaded + 4);
    }
  }

  async function fetchItems() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setItems(data);
      setLoading(false);

      console.log(data);
    } catch (error) {
      console.log("Error fetching: ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function filterItems(filter) {
    setLoaded(8)

    if (filter === "price_low_to_high") {
      setItems(items.slice().sort((a, b) => a.price - b.price));
    } else if (filter === "price_high_to_low") {
      setItems(items.slice().sort((a, b) => b.price - a.price));
    } else if (filter === "likes_high_to_low") {
      setItems(items.slice().sort((a, b) => b.likes - a.likes));
    } else if (filter === "") {
      fetchItems()
    }
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
        >
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
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width={261} height={441} borderRadius={15} />
            </div>
          ))}
        </>
      ) : (
        <>
          {items.slice(0, loaded).map((item) => (
            <ExploreItem item={item} key={item.id} />
          ))}
        </>
      )}
      {/*
      {new Array(8).fill(0).map((_, index) => (
        <div
          key={index}
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
                <img className="lazy" src={AuthorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">5h 30m 32s</div>

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
                <img src={nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>Pinky Ocean</h4>
              </Link>
              <div className="nft__item_price">1.74 ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>69</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      */}
      <div className="col-md-12 text-center">
        {loaded !== 16 ? (
          <button onClick={loadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
