import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import "./ExploreItems.css"; 

const SkeletonCard = () => {
  return (
    <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block" }}>
      <div className="nft__item">
        <div className="author_list_pp skeleton skeleton-img"></div>
        <div className="nft__item_wrap">
          <div className="skeleton skeleton-img"></div>
        </div>
        <div className="nft__item_info">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-small"></div>
        </div>
      </div>
    </div>
  );
};

const ExploreItems = () => {
  const [items, setItems] = useState([]); 
  const [masterItems, setMasterItems] = useState([]); 
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const data = await res.json();
        setItems(data);
        setMasterItems(data); 
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setFilter(selected);

    let sortedItems = [...masterItems]; 
    if (selected === "price_low_to_high") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (selected === "price_high_to_low") {
      sortedItems.sort((a, b) => b.price - a.price);
    } else if (selected === "likes_high_to_low") {
      sortedItems.sort((a, b) => b.likes - a.likes);
    }

    setItems(sortedItems);
    setVisibleCount(4); 
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
        : items.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {item.expiryDate && (
                  <Countdown
                    date={item.expiryDate}
                    renderer={({ hours, minutes, seconds }) => (
                      <div className="de_countdown">
                        {hours}h {minutes}m {seconds}s
                      </div>
                    )}
                  />
                )}

                <div className="nft__item_wrap">
                  <Link to={`/item-details/${item.id}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to={`/item-details/${item.id}`}>
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

      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={handleLoadMore} className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
