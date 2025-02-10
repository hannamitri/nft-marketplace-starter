import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Counter from "../UI/Counter";

// CHANGE

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  async function getItems() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  function filterItems(filter) {
    switch (filter) {
      case "price_low_to_high":
        return setItems(items.slice().sort((a, b) => a.price - b.price));
      case "price_high_to_low":
        return setItems(items.slice().sort((a, b) => b.price - a.price));
      case "likes_high_to_low":
        return setItems(items.slice().sort((a, b) => b.likes - a.likes));
      default:
        break;
    }
  }

  const loadMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 4); // increase visible count by 4
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="px-2">
      <div className="nft__item" style={{ opacity: 0.7 }}>
        <div className="author_list_pp">
          <div
            className="lazy skeleton-loading"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#eee",
            }}
          ></div>
        </div>
        <div
          className="de_countdown skeleton-loading"
          style={{ background: "#eee", height: "20px", width: "20%", border: "none" }}
        ></div>
        <div className="nft__item_wrap">
          <div
            className="skeleton-loading"
            style={{ height: "200px", background: "#eee", borderRadius: "8px", width: "100%"}}
          ></div>
        </div>
        <div className="nft__item_info">
          <div
            className="skeleton-loading"
            style={{
              height: "20px",
              width: "70%",
              background: "#eee",
              margin: "10px 0",
            }}
          ></div>
          <div
            className="skeleton-loading"
            style={{ height: "15px", width: "40%", background: "#eee" }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div>
        <select
          id="filter-items"
          onChange={(event) => filterItems(event.target.value)}
          defaultValue=""
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {isLoading ? (
        new Array(8).fill(0).map((_, index) => 
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">

        <LoadingSkeleton key={index} />
      
        </div>
      )
      ) : (
        <>
          {items.slice(0, visibleCount).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div
                className="nft__item"
              >
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={AuthorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Counter itemExpiryDate={item.expiryDate} />

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
                  <div className="nft__item_price">{item.price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {visibleCount < 16 && (
            <div className="col-md-12 text-center">
              <button
                id="loadmore"
                className="btn-main lead"
                onClick={loadMoreItems}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ExploreItems;
