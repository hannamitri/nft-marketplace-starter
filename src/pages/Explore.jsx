import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();


const Explore = () => {
  const [explore, setExplore] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const response = await axios(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low`
    );

    setExplore(response.data);
    // console.log(response.data);
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    //FROM MAIN DONOT REMOVE
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
              <ExploreItems />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
