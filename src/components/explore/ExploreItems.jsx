import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CountdownTimer from "../UI/CountdownTimer";


const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const navigate = useNavigate();


  async function fetchExploreItems() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExploreItems(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchExploreItems();
  }, []);

  const loadMore = () => {
    setVisibleItems((prevValue) => prevValue + 4)
  }

  async function filterNFTs(value) {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    );
    setExploreItems(data);
    setLoading(false);
  }


  return (
    <>
      <div>
        <select id="filter" defaultValue="Default" onChange={(event) => filterNFTs (event.target.value)}>
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
                  <div className="skeleton author_list_pp-skeleton"></div>
                </div>

                <div className="nft__item_wrap">
                  <div className="skeleton nft__item_wrap-skeleton"></div>
                </div>
                <br />
                <div className="nft__item_info">
                  <h4>
                    <div className="skeleton nft_title-skeleton"></div>
                  </h4>

                  <div className="nft__item_price">
                    <div className="skeleton nft__item_price-skeleton"></div>
                  </div>
                  <div className="nft__item_like">
                    <div className="skeleton nft__item_like-skeleton"></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : exploreItems.slice(0, visibleItems).map((exploreItem) => (
            <div
              key={exploreItem.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to= {`/author/${exploreItem.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img
                      className="lazy"
                      src={exploreItem.authorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div
                  className={`${exploreItem.expiryDate ? "de_countdown" : " "}`}
                >
                  <CountdownTimer
                    countdownTimestampsMs={exploreItem.expiryDate}
                  />
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
                      src={exploreItem.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
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
        {visibleItems >= exploreItems.length ? null : <Link to="" onClick={loadMore} id="loadmore" className="btn-main lead">
          Load more
        </Link>}
      </div>
    </>
  );
};

export default ExploreItems;
