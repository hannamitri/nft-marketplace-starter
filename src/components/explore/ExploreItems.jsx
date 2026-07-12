import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CountdownTimer from "../home/CountdownTimer";
import "./ExploreItems.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init()

const ExploreItems = ({ exploreItem }) => {
  const [explore, setExplore] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expiryDate, setExpiryDate] = useState(null);

  const [visibleCount, setVisibleCount] = useState(8);
  const showMoreItems = () => {
    setVisibleCount((prevValue) => prevValue + 4);
  }

  const [sortType, setSortType] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${sortType}`)
    .then((response) => {
      setTimeout(() => {
      setExplore(response.data);
      setExpiryDate(response.data.expiryDate)
      setLoading(false);
      }, 1000)
    })
    .catch((error) => {
      console.error("No item found:", error);
    });
  }, [sortType]);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e) => setSortType(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ?
      new Array(8).fill(0).map((_, index) => (
        <div
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="skeleton__explore--items"></div>
        </div>
      ))
        :
        explore.slice(0, visibleCount).map((exploreItem, index) => (
        <div
          data-aos="fade-in"
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${exploreItem.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={exploreItem.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">
              {exploreItem.expiryDate ? <CountdownTimer targetDate={exploreItem.expiryDate} /> : <div></div>}
            </div>
            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${exploreItem.nftId}`}>
                <img src={exploreItem.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${exploreItem.nftId}`}>
                <h4>{exploreItem.title}</h4>
              </Link>
              <div className="nft__item_price">{exploreItem.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{exploreItem.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        {visibleCount < explore.length && (
        <Link to="" id="loadmore" className="btn-main lead" onClick={showMoreItems}>
          Load more
        </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
