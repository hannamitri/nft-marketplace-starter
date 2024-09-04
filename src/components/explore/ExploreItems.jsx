import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CountdownTimer from "../UI/CountdownTimer";
import ExploreSkeleton from "../UI/ExploreSkeleton";

const ExploreItems = () => {
  const [exploreData, setExploreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState(4);
  const [sortOption, setSortOption] = useState("default");

  async function fetchExploreData(sortOption) {
    setLoading(true);
    setError(null);

    let apiEndpoint = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;
    switch (sortOption) {
      case "price_high_to_low":
        apiEndpoint = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${sortOption}`;
        break;
      case "price_low_to_high":
        apiEndpoint = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${sortOption}`;
        break;
      case "likes_high_to_low":
        apiEndpoint = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${sortOption}`;
        break;
      default:
        break;
    }

    try {
      const response = await axios.get(apiEndpoint);
      setExploreData(response.data);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExploreData(sortOption);
  }, [sortOption]);

  const loadMoreCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setVisibleCards(4);
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="default">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <>
          <ExploreSkeleton />
          <ExploreSkeleton />
          <ExploreSkeleton />
          <ExploreSkeleton />
        </>
      ) : (
        exploreData.slice(0, visibleCards).map((item) => (
          <div
            key={item.id}
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
              <CountdownTimer expirationDate={item.expiryDate} />
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
      )}
      {}
      <div className="col-md-12 text-center">
        <Link
          to=""
          id="loadmore"
          className="btn-main lead"
          onClick={loadMoreCards}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
