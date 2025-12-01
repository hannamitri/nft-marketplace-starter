import React, { useEffect, useState } from "react";
import DynamicCard from "../DynamicCard";
import CountdownTimer from "../CountdownTimer";

import AOS from "aos";
import "aos/dist/aos.css";

const ITEMS_PER_PAGE = 4;
const INITIAL_COUNT = 8;

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const handleLoad = () => {
      AOS.refresh();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  });

  useEffect(() => {
    setLoading(true);
    setVisibleCount(INITIAL_COUNT);
    const url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.slice(0, 16));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filter]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, items.length));
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          data-aos="fade-right"
          data-aos-delay="1000"
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      <div className="row" data-aos="fade-up" data-aos-delay="2">
        {loading
          ? [...Array(INITIAL_COUNT)].map((_, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <DynamicCard loading />
              </div>
            ))
          : items.slice(0, visibleCount).map((item) => (
              <div
                key={item.id}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <DynamicCard cardData={item}>
                  <CountdownTimer expiryDate={item.expiryDate} />
                </DynamicCard>
              </div>
            ))}
      </div>

      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
