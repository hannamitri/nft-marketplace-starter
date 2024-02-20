import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const [originalItems, setOriginalItems] = useState([]);
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemLimit, setItemLimit] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchExploreItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        if (isMounted) {
          console.log("Fetched data:", response.data);
          setOriginalItems(response.data); // Store the original fetched items
          setExploreItems(response.data); // Set items for display
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchExploreItems();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // Use a separate state or variable for sorted items to avoid direct modification
    const sortedItems = sortItems(originalItems, filter);
    setExploreItems(sortedItems); // Update the displayed items based on sorting
  }, [filter, originalItems]);

  const loadMoreItems = () => {
    setItemLimit((prevLimit) => prevLimit + 4);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const sortItems = (items, filter) => {
    let sortedItems = [...items];
    switch (filter) {
      case "price_low_to_high":
        return sortedItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price_high_to_low":
        return sortedItems.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case "likes_high_to_low":
        return sortedItems.sort((a, b) => b.likes - a.likes);
      default:
        return sortedItems; // Return items unsorted if no filter is selected
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
      <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {Array.isArray(exploreItems) && exploreItems.slice(0, itemLimit).map(
      (item, index) => (
        <div key={item.id || index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block", backgroundSize: "cover" }}>
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
     {itemLimit < (exploreItems?.length || 0) && (
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
