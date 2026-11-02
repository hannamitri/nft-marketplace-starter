import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import axios from "axios";

const Explore = () => {
  const [exploreData, setExploreData] = useState([]);
  const [exploreLoading, setExploreLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function fetchexplore() {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
      );
      setExploreData(response.data);
      setExploreLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setExploreLoading(false);
    }
  }

  useEffect(() => {
    fetchexplore();
  }, []);

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
              <ExploreItems data={exploreData} loading={exploreLoading} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
