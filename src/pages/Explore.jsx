import React, { useEffect, useState } from "react";
import axios from "axios";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");

  async function fetchExploreData(filter = "") {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching explore data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExploreData();
  }, []);

  useEffect(() => {
    if (sortOption !== "") {
      setLoading(true);
      fetchExploreData(sortOption);
    }
  }, [sortOption]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
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
              <ExploreItems
                items={items.slice(0, visibleCount)}
                loading={loading}
                onSortChange={setSortOption}
              />

              {!loading && visibleCount < items.length && (
                <div className="col-md-12 text-center mt-4">
                  <button
                    className="btn-main"
                    onClick={loadMore}
                    style={{ padding: "10px 25px", fontSize: "16px" }}
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