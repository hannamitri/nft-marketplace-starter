import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Timer from "../Timer";

const ExploreItems = () => {
  const [explores, setExplores] = useState([]);
  const [loadMore, setLoadMore] = useState(8);

  async function fetchExplores() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );

    setExplores(data);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchExplores();
    }, 600);
  }, []);
  const showMore = () => {
    setLoadMore((preValue) => preValue + 4);
  };

  //https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {explores.slice(0, loadMore).map((explore) => (
        <div
          key={explore.id}
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
                <img className="lazy" src={explore.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">
              {" "}
              <Timer expirationDate={explore.expiryDate} />
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
              <Link to="/item-details">
                <img
                  src={explore.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{explore.title}</h4>
              </Link>
              <div className="nft__item_price">{explore.price}</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{explore.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={showMore}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
