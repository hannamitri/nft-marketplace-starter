import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  let timer;

  async function fetchData() {
    const response = await fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    const result = await response.json();
    setData(result);

    timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  fetchData();
  return () => clearTimeout(timer);
}, [data]);

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
              <ExploreItems items={data} loading={loading} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
