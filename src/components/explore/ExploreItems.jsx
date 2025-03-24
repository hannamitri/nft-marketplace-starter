import React, { useEffect, useState } from "react";
import axios from "axios";
import NFTItem from "../NFTItem";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("");

  async function getData(filter) {
    const filterParam = filter ? `?filter=${filter}` : "";
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filterParam}`
    );
    const results = response.data;
    setItems(results);
  }

  useEffect(() => {
    getData(filter);
  }, [filter]);

  setTimeout(() => {
    setLoading(false);
  }, 400);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setLoading(true);
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
      {loading ? (
        <div className="skeleton-grid">
          {new Array(8).fill(0).map((_, index) => (
            <div className="px-1" key={index}>
              <div className="author_list_pp">
                <div
                  className="skeleton-box"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                ></div>
                <i className="fa fa-check"></i>
              </div>
              <div
                className="skeleton-box"
                style={{
                  width: "80px",
                  height: "25px",
                  margin: "10px 0",
                  right: "-200px",
                }}
              ></div>
              <div className="nft_wrap">
                <div
                  className="skeleton-box"
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "10px",
                  }}
                ></div>
              </div>
              <div className="nft__item_info">
                <div
                  className="skeleton-box"
                  style={{
                    width: "100px",
                    height: "20px",
                    marginBottom: "5px",
                  }}
                ></div>
                <br />
                <div
                  className="skeleton-box"
                  style={{ width: "60px", height: "20px" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        items
          .slice(0, visibleCount)
          .map((item, index) => (
            <NFTItem
              key={index}
              item={item}
              wrapperClass="col-lg-3 col-md-6 col-sm-6 col-xs-12"
            />
          ))
      )}
      {visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={loadMore} className="btn-main lead" data-aos="fade-up" data-aos-duration="1000">
            Load more
          </button>
        </div>
      )}
      ;
    </>
  );
};

export default ExploreItems;
