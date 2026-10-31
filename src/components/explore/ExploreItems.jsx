import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useCountdown from "../../timer/timer.jsx";

const ExploreItems = () => {
  const [exploreData, setExploreData] = useState([]);
  const countdowns = useCountdown(exploreData);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExplore() {
      const exploreFetchedData = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
      );
      setExploreData(exploreFetchedData.data);
      setLoading(false);
    }

    fetchExplore();
  }, []);

  async function sortExploreItems(event) {
    const filterValue = event.target.value;

    if (filterValue === "price_low_to_high") {
      const priceLowToHigh = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high",
      );
      setExploreData(priceLowToHigh.data);
    } else if (filterValue === "price_high_to_low") {
      const priceHighToLow = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low",
      );
      setExploreData(priceHighToLow.data);
    } else if (filterValue === "likes_high_to_low") {
      const likesHighToLow = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low",
      );
      setExploreData(likesHighToLow.data);
    }
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={sortExploreItems}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <div className="row">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="nft_coll">
                <div className="skeleton-box skeleton-image"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        exploreData.slice(0, visibleItems).map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate != null && (
                <div className="de_countdown">{countdowns[item.id]}</div>
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
                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
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
      )}
      <div className="col-md-12 text-center">
        <Link
          to=""
          id="loadmore"
          className="btn-main lead"
          onClick={() => setVisibleItems((prev) => prev + 4)}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
