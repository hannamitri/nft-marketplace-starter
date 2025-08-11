import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import CountDown from "../CountDown";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const getExploreData = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
      );
      setExploreItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching Explore Items", error);
    }
  };

  async function filterItems(filter) {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );

    setExploreItems(response.data);
  }

  useEffect(() => {
    getExploreData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {(exploreItems.length === 0
        ? new Array(8).fill(0)
        : exploreItems.slice(0, visibleCount)
      ).map((item, index) =>
        item ? (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId || ""}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img
                    className="lazy"
                    src={item.authorImage || AuthorImage}
                    alt=""
                  />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate && <CountDown expiryDate={item.expiryDate} />}
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
                <Link to={`/item-details/${item.nftId || ""}`}>
                  <img
                    src={item.nftImage || nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId || ""}`}>
                  <h4>{item.title || "No Title"}</h4>
                </Link>
                <div className="nft__item_info-text">
                  <div className="nft__item_price">
                    {item.price || "No Price"} ETH
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="skeleton-nft-card">
              <div className="skeleton-nft-card-img-area">
                <div className="skeleton-nft-card-avatar"></div>
                <div className="skeleton-nft-card-check">
                  <i className="fa fa-check"></i>
                </div>
                <div className="skeleton-nft-card-img"></div>
              </div>
              <div className="skeleton-nft-card-row skeleton-nft-card-row-lg"></div>
              <div className="skeleton-nft-card-footer">
                <div className="skeleton-nft-card-row skeleton-nft-card-row-md"></div>
                <div className="skeleton-nft-card-row skeleton-nft-card-row-xs"></div>
              </div>
            </div>
          </div>
        )
      )}
      {visibleCount < exploreItems.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
