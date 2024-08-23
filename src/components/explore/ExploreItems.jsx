import React, { useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../FormatTime";

const ExploreItems = ({ exploreData }) => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [filter, setFilter] = useState("");

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => {
      if (prevVisibleItems + 4 > exploreData.length) {
        return exploreData.length;
      }
      return prevVisibleItems + 4;
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const getFilteredData = () => {
    let filteredData = [...exploreData];

    if (filter === "price_low_to_high") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (filter === "price_high_to_low") {
      filteredData.sort((a, b) => b.price - a.price);
    } else if (filter === "likes_high_to_low") {
      filteredData.sort((a, b) => b.likes - a.likes);
    }

    return filteredData;
  };

  const filteredData = getFilteredData();

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {filteredData.slice(0, visibleItems).map((item, index) => (
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
                <img
                  className="lazy"
                  src={item.authorImage}
                  alt={item.authorName}
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div>
              <Countdown expiryDate={item.expiryDate} />
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
                  alt={item.name}
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.id}`}>
                <h4>{item.name}</h4>
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
        {visibleItems < filteredData.length && (
          <button
            onClick={handleLoadMore}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
