import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";

const ExploreItems = () => {
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState([]);
  const [time, setTime] = useState(new Date());
  const [displayCount, setDisplayCount] = useState(8);
  const [filter, setFilter] = useState("");

  async function loadNfts() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );
    setNfts(data);
    setLoading(false);
  }

  function increaseDisplayCount() {
    setDisplayCount(displayCount + 4);
  }

  useEffect(() => {
    loadNfts();
  }, [filter]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => setFilter(e.target.value)}
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
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    width={60}
                    height={60}
                  ></Skeleton>
                  <i className="fa fa-check"></i>
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
                  <Skeleton animation="wave" width="100%" height="100%" />
                </div>
                <div className="nft__item_info">
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="35%"
                    style={{ marginBottom: "5px" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="20%"
                  />
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                  </div>
                </div>
              </div>
            </div>
          ))
        : nfts.slice(0, displayCount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/:${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && (
                  <div className="de_countdown">{`${Math.floor(
                    (item.expiryDate - time) / 1000 / 60 / 24
                  )}h ${Math.floor(
                    ((item.expiryDate - time) / 1000 / 60) % 60
                  )}m ${Math.floor(
                    ((item.expiryDate - time) / 1000) % 60
                  )}s`}</div>
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
                  <div className="nft__item_price">{`${item.price} ETH`}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        {displayCount < 16 ? (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={increaseDisplayCount}
          >
            Load more
          </Link>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ExploreItems;
