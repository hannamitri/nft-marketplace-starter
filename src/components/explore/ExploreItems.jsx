import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";

const ExploreItems = () => {
const [sortOption, setSortOption] = useState("");


  const [items, setItems] = useState([]);

useEffect(() => {
  async function fetchItems() {
    try {
      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );

      const data = await response.json();

      console.log("EXPLORE API:", data);

      setItems(data);
    } catch (error) {
      console.error("Explore API error:", error);
    }
  }

  fetchItems();
}, []);


const [visibleItems, setVisibleItems] = useState(8);
const [now, setNow] = useState(Date.now());

useEffect(() => {
  const timer = setInterval(() => {
    setNow(Date.now());
  }, 1000);


  return () => clearInterval(timer);
}, []);

const formatCountdown = (expiration) => {
  if (!expiration) return "";

  const endTime = new Date(expiration).getTime();
  const difference = endTime - now;

  if (difference <= 0) {
    return "Expired";
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor(
    (difference % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (difference % (1000 * 60)) / 1000
  );

  return `${hours}h ${minutes}m ${seconds}s`;
};

console.log("EXPLORE ITEMS:", items);

const sortedItems = [...items].sort((a, b) => {
  if (sortOption === "price_low_to_high") {
    return Number(a.price) - Number(b.price);
  }

  if (sortOption === "price_high_to_low") {
    return Number(b.price) - Number(a.price);
  }

  if (sortOption === "likes_high_to_low") {
    return Number(b.likes) - Number(a.likes);
  }

  return 0;
});

  return (
    <React.Fragment>
      <div className="col-lg-12">
  <div className="items_filter">
    <select
  id="filter-items"
  value={sortOption}
  onChange={(e) => setSortOption(e.target.value)}
>
      <option value="">Default</option>
      <option value="price_low_to_high">Price, Low to High</option>
      <option value="price_high_to_low">Price, High to Low</option>
      <option value="likes_high_to_low">Most liked</option>
    </select>
  </div>
</div>
    

    <div className="row">
  {sortedItems.slice(0, visibleItems).map((item) => (
    <div
      key={item.nftId || item.id}
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "block" }}
    >
      <div className="nft__item">

        <div className="author_list_pp">
          <Link to={`/author/${item.authorId}`}>
            <img
              className="lazy"
              src={item.authorImage}
              alt={item.authorName}
            />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        {item.expiryDate && (
          <div className="de_countdown">
            {formatCountdown(item.expiryDate)}
          </div>
        )}

        <div className="nft__item_wrap">
          <Link
            to={`/item-details/${item.nftId}`}
            state={{ item }}
          >
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt={item.title}
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
   
  ))}
       
      {visibleItems < sortedItems.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleItems((prev) => prev + 4)}
          >
            Load more
          </button>
        </div>
      )}
    </div>
    </React.Fragment>
  );
};

export default ExploreItems;
