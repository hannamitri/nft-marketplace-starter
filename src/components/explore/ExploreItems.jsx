import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../../components/UI/Skeleton";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(8);

  async function fetchItems(filterValue = "") {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
      );
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  // Refresh AOS whenever data changes so new elements are animated
  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [items, visible, loading]);

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <select id="filter-items" onChange={(e) => fetchItems(e.target.value)}>
        <option value="">Default</option>
        <option value="price_low_to_high">Price, Low to High</option>
        <option value="price_high_to_low">Price, High to Low</option>
        <option value="likes_high_to_low">Most liked</option>
      </select>

      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        {loading
          ? new Array(8).fill(0).map((_, i) => <Skeleton key={i} />)
          : items.slice(0, visible).map((item) => (
              <div 
                key={item.id} 
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", minHeight: "300px" }}
                // Animation applied to each individual card
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img src={item.author_image || item.authorImage} alt="author" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  
                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img src={item.nft_image || item.nftImage} className="nft__item_preview" alt="nft" />
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
      </div>

      {visible < items.length && (
        <div className="text-center">
          <button className="btn-main" onClick={() => setVisible(visible + 4)}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;