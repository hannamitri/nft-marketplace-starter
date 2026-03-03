import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import axios from "axios";

const Explore = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItems();
  }, []);

  const fetchItems = async (filter = "") => {
    setLoading(true);
    try {
      const url = filter
        ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

      const response = await axios.get(url);
      setItems(response.data);
      setVisibleCount(8);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const visibleItems = items.slice(0, visibleCount);

  const showLoadMore = visibleCount < 16 && visibleCount < items.length;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <ExploreItems
                items={visibleItems}
                loading={loading}
                onFilter={fetchItems}
                onLoadMore={loadMore}
                showLoadMore={showLoadMore}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
