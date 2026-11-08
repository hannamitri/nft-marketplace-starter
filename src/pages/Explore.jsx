import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [now, setNow] = useState(Date.now());
const [visibleCount, setVisibleCount] = useState(8);
const [filter, setFilter] = useState("");

useEffect(() => {
  let timer;

  async function fetchData() {
    try {
      const response = await fetch(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filter ? `?filter=${filter}` : ""}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Explore items");
      }

      const result = await response.json();

      console.log("Explore API data:", result);
      setData(result);

    } catch (error) {
      console.error("Error fetching data:", error);
    }

    timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  
  fetchData();
}, [filter]);

const handleFilterChange = (event) => {
  setFilter(event.target.value);
}

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

  return () => clearInterval(timer);
  
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
              <ExploreItems
              items={data} 
              loading={loading}
              visibleCount={visibleCount}
              setVisibleCount={setVisibleCount}
              handleFilterChange={handleFilterChange}
              now={now}
            />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
