import React, { useState, useEffect } from "react";
import axios from "axios";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
      );
      console.log(data)
      
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
              <ExploreItems items={items.slice(0, visibleCount)} />
              {visibleCount < items.length && (
                <div className="col-md-12 text-center">
                  <button
                    className="btn-main"
                    onClick={() => setVisibleCount(visibleCount + 4)}
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
