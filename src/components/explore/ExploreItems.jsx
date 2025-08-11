import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "react-countdown";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchExploreItems = async (filterType = "") => {
    setLoading(true);
    try {
      const url = filterType
        ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterType}`
        : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
      const response = await axios.get(url);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching explore items:", error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchExploreItems();
  }, []);

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    fetchExploreItems(selectedFilter);
  };

  return (
    <>
      <div className="col-md-12 mb-4">
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {(loading ? Array.from({ length: 8 }) : items).map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          data-aos="fade-up"
          style={{ display: "block" }}
        >
          <div className="nft__item">
            {loading ? (
              <div className="nft__item_wrap skeleton-box" style={{ height: "250px" }} />
            ) : (
              <>
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img className="lazy" src={item.authorImage} alt={item.authorName} />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                  <Countdown date={item.expiryDate} />
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="#" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="#" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
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
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
//testing comment
export default ExploreItems;
