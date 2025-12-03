import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SkeletonGrid from "../skeletons/SkeletonGrid";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  const API_URL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

  const getRemainingTime = (expiryDate) => {
    const now = Date.now();
    const timeLeft = expiryDate - now;

    if (timeLeft <= 0) return "00h : 00m : 00s";

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${hours}h : ${minutes}m : ${seconds}s`;
  };

  
  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prev) => [...prev]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

 
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const url = filter ? `${API_URL}?filter=${filter}` : API_URL;
        const { data } = await axios.get(url);

        setItems(data);
        setVisibleCount(8);
      } catch (err) {
        console.error("Error fetching explore items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [filter]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
     
      <div className="mb-4">
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      
      {loading && <SkeletonGrid count={8} />}

      
      {!loading &&
        items.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">

              <div className="author_list_pp">
                <Link to={`/author/${item.authorId}`}>
                  <img className="lazy" src={item.authorImage} alt={item.author} />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              <div className="de_countdown">
                {getRemainingTime(item.expiryDate)}
              </div>

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer"><i className="fa fa-facebook fa-lg"></i></a>
                      <a href="" target="_blank" rel="noreferrer"><i className="fa fa-twitter fa-lg"></i></a>
                      <a href=""><i className="fa fa-envelope fa-lg"></i></a>
                    </div>
                  </div>
                </div>

                <Link to={`/item-details/${item.nftId}`}>
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

      
      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={loadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;

