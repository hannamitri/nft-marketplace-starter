import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CountDown from "../UI/CountDown";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [NFTPerPage, setNFTPerPage] = useState(8);
  const [loadMoreButton, setLoadMoreButton] = useState(true);

  async function fetchExploreItems() {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setLoading(false);
    setExploreItems(response.data);
  }

  useEffect(() => {
    fetchExploreItems();
  }, [NFTPerPage]);

  function handleLoadMoreButton() {
    if (exploreItems.length === NFTPerPage) {
      setLoadMoreButton(false);
    }
    setNFTPerPage((prev) => prev + 4);
  }

  async function sortedCards(value) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    );
    setLoading(true)
    setTimeout(() => {
      setExploreItems(data);
      setLoading(false);
    }, 1500)
  }

 

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => sortedCards(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width={50} height={50} borderRadius={50} />
                </div>
                <Skeleton width={80} height={40} borderRadius={4} />
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
                  <Skeleton width="100%" height="100%" borderRadius={6} />
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <Skeleton width="37%" height={20} borderRadius={4} />
                  </Link>
                  <div className="nft__item_price"><Skeleton width={15} height={15}/></div>
                  <div className="nft__item_like">
                    <span><Skeleton width={20} height={20} borderRadius={4}/></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {exploreItems.slice(0, NFTPerPage).map((exploreItem, index) => (
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
                    <img
                      className="lazy"
                      src={exploreItem.authorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <CountDown expiryDate={exploreItem.expiryDate}/>

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
                  <div className="nft__item_price">{exploreItem.price}ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{exploreItem.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {loadMoreButton && (
        <div className="col-md-12 text-center">
          <button onClick={handleLoadMoreButton} className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
