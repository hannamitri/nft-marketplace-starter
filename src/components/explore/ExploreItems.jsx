import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const [exploreItems, setExploreItemss] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemLimit, setItemLimit] = useState(8); // Initial item limit set to 8

  useEffect(() => {
    const fetchExploreItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        console.log("Fetched data:", response.data);
        setExploreItemss(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    };

    fetchExploreItems();
  }, []);

  const loadMoreItems = () => {
    setItemLimit((prevLimit) => prevLimit + 4); // Increase the item limit by 4 each time
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      {exploreItems.slice(0, itemLimit).map(
        (
          item,
          index // Use slice to limit items
        ) => (
          <div
            key={item.id || index}
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
              <div>
                <Countdown expiryDate={item.expiryDate} />
              </div>
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      {/* Social links omitted for brevity */}
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
        )
      )}
      {itemLimit >= exploreItems.length ? null : (
      <div className="col-md-12 text-center">
        <button onClick={loadMoreItems} id="loadmore" className="btn-main lead">
          Load more
        </button>
      </div>
      )}
    </>
  );
};

export default ExploreItems;
