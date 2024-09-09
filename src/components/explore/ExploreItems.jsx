import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Timer from "../UI/Timer";
import SkeletonPP from "../../images/hot-collection-skeleton--pp.png";

const ExploreItems = () => {
  const [exploreItemsData, setExploreItemsData] = useState([]);
  const loadMoreButton = document.getElementById("loadmore__container");
  const [itemsToLoad, setItemsToLoad] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('')

  async function getExploreItems() {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );
    setExploreItemsData(response.data);
    setIsLoading(false);
  }

  function loadMoreItems() {
    if (itemsToLoad === 8) {
      setItemsToLoad(12);
    } else if (itemsToLoad === 12) {
      setItemsToLoad(16);
      loadMoreButton.innerHTML = null;
    }
  }

  useEffect(() => {
    getExploreItems();
  });
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e) => setFilter(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!isLoading
        ? exploreItemsData.slice(0, itemsToLoad).map((item, index) => (
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
                {item.expiryDate ? <Timer expDate={item.expiryDate} /> : null}

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
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <img className="lazy" src={SkeletonPP} alt="" />
                  <i className="fa fa-check"></i>
                </div>

                <div className="nft__item_wrap">
                  <img
                    src={SkeletonPP}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4 className="new-items__title"></h4>
                  </Link>
                  <div className="nft__item_price nft-price__skele"></div>
                  <div className="nft__item_like">
                    <div className="nft-likes__skele"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div id="loadmore__container" className="col-md-12 text-center">
        <Link
          to=""
          id="loadmore"
          className="btn-main lead"
          onClick={() => loadMoreItems()}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
