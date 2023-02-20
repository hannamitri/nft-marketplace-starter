import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [img, setImg] = useState();

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortItems = (items, sortType) => {
    switch (sortType) {
      case "price_low_to_high":
        return [...items].sort((a, b) => a.price - b.price);
      case "price_high_to_low":
        return [...items].sort((a, b) => b.price - a.price);
      case "likes_high_to_low":
        return [...items].sort((a, b) => b.likes - a.likes);
      default:
        return items;
    }
  };

  const sortedItems = sortItems(items, selectedFilter);

  const getTimeRemaining = (expiryDate) => {
    const totalSeconds = Date.parse(expiryDate) - Date.parse(new Date());
    if (totalSeconds <= 0) {
      return "Expired";
    }
    const hours = Math.floor((totalSeconds / 3600000) % 24);
    const minutes = Math.floor((totalSeconds / 60000) % 60);
    const seconds = Math.floor((totalSeconds / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  const loadMoreButton = () => {
    if (visibleItems < items.length) {
      return (
        <div className="col-md-12 text-center">
          <button
            onClick={handleLoadMore}
            href="#"
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      );
    }
  };

  return (
        <>
          <div>
            <select
              id="filter-items"
              defaultValue=""
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="">Default</option>
              <option value="price_low_to_high">Price, Low to High</option>
              <option value="price_high_to_low">Price, High to Low</option>
              <option value="likes_high_to_low">Most liked</option>
            </select>
          </div>
          {sortedItems.slice(0, visibleItems).map((item, index) => (
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
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                  {getTimeRemaining(item.expiryDate)}
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
                  <Link to={`/item-details/${item.authorId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.authorId}`}>
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
          {loadMoreButton()}
        </>
      )};

export default ExploreItems;
