import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [loading, setLoading] = useState(false);
  const [nftApi, setNftApi] = useState([]);
  const [time, setTime] = useState(new Date());
  const [nftSlice, setSlice] = useState(8);

  async function fetchData() {
    setLoading(true);
    const data = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    const result = data.data;
    setNftApi(result);
    setLoading(false);
  }
  async function filterApi(filter) {
    setLoading(true);
    const data = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );
    const result = data.data;
    setNftApi(result);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div>
        <select onChange={(event)=>filterApi(event.target.value)} id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(12).fill(0).map((array, index) => (
          <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
                <Skeleton width="100%" height="400px" />
            </div>
          ))
        : nftApi.slice(0, nftSlice).map((array, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${array.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={array.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {array.expiryDate - time > 0 && (
                  <div className="de_countdown">
                    <span>
                      {Math.floor((array.expiryDate - time) / 1000 / 60 / 60)}
                    </span>
                    <span>h </span>
                    <span>
                      {Math.floor(((array.expiryDate - time) / 1000 / 60) % 60)}
                    </span>
                    <span>m </span>
                    <span>
                      {Math.floor((array.expiryDate - time) / 1000) % 60}
                    </span>
                    <span>s</span>
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
                      src={array.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{array.title}</h4>
                  </Link>
                  <div className="nft__item_price">{array.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{array.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        {nftSlice < nftApi.length && (
          <button
            id="loadmore"
            onClick={() => setSlice(nftSlice + 4)}
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
