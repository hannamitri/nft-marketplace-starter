import React from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../common/CountdownTimer";
import Skeleton from "../skeleton/Skeleton";

const ExploreItems = ({ items, loading, onSortChange }) => {
    return (
    <>
      {/* FILTER DROPDOWN */}
      <div className="col-lg-12 mb-4">
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => onSortChange(e.target.value)}
          >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>       
      </div>

      {/* SKELETON LOADING */}
      {loading &&
        new Array(8).fill(0).map((_, i) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={i}>
            <Skeleton width="100%" height="250px" />
            <Skeleton width="60%" height="20px" className="mt-2" />
            <Skeleton width="40%" height="15px" />
          </div>
        ))}

      {/* REAL API DATA */}
      {!loading &&
        items.map((item) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item.id}>
            <div className="nft__item">
              <div className="author_list_pp">
                <Link to={`/author/${item.authorId}`}>
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              {item.expiryDate && (
                <div className="de_countdown">
                  <CountdownTimer expiryDate={item.expiryDate} />
                </div>
              )}

              <div className="nft__item_wrap">
                <Link to={`/item-details/${item.nftId}`} state={{ item }}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt={item.title}
                  />
                </Link>
              </div>

              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`} state={{ item }}>
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
    </>
  );
};

export default ExploreItems;