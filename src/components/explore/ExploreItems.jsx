import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../Countdown";

const ExploreItems = () => {
  const [explore, setExplore] = useState(new Array(8).fill("0"));
  const [isLoading, setIsLoading] = useState(true); // set initial value to true
  const [endArr, setEndArr] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      )
      .then((res) => {
        setExplore(res.data);
        setIsLoading(false); // set to false after getting data
      });
  }, [filter, isLoading]);

  function showVisibility(index) {
    if (index < endArr) {
      return "block";
    }
    return "none";
  }

  function loadMore() {
    setEndArr(endArr + 4);
  }

  function getSelectValue(event) {
    setFilter(event.target.value);
    setIsLoading(true)
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={getSelectValue}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {explore.map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          {isLoading ? (
            <div
              className="skeleton-box"
              style={{ width: "100%", height: "400px" }}
            ></div>
          ) : (
            <div
              className="nft__item"
              style={{ display: `${showVisibility(index)}` }}
            >
              <Countdown expiry={_.expiryDate} />{" "}
              <div className="author_list_pp">
                <Link
                  to={`/author/${_.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={_.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
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
                <Link to={`/item-details/${_.nftId}`}>
                  <img
                    src={_.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4>{_.title}</h4>
                </Link>
                <div className="nft__item_price">{_.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{_.likes}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      {endArr < 16 ? (
        <div onClick={loadMore} className="col-md-12 text-center">
          <Link to="" id="loadmore" className="btn-main lead">
            Load more
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ExploreItems;
