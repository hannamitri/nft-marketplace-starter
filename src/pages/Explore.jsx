import React, { useState, useEffect } from "react";
import axios from "axios";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async (filterValue) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
          filterValue ? `?filter=${filterValue}` : ""
        }`,
      );

      // console.log(data)

      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    fetchData(selectedFilter);
  };

  const loadMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

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
              <div className="col-md-12 text-center">
                <div className="items_filter">
                  <select
                    id="filter-items"
                    name="filter-items"
                    onChange={handleFilterChange}
                    defaultValue=""
                  >
                    <option value="">Default</option>
                    <option value="price_low_to_high">
                      Price, Low to High
                    </option>
                    <option value="price_high_to_low">
                      Price, High to Low
                    </option>
                    <option value="likes_high_to_low">Most Liked</option>
                  </select>
                </div>
              </div>
              <ExploreItems
                items={items}
                visibleCount={visibleCount}
                loading={loading}
              />

              {visibleCount < items.length && (
                <div className="col-md-12 text-center">
                  <button
                    onClick={loadMoreItems}
                    id="loadmore"
                    className="btn-main"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Explore;
