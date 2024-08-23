import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
const Explore = () => {
  const [explore, setExplore] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((response) => {
        setExplore(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div id="wrapper" data-aos="fade-up">
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
              {loading ? (
                <>
                  <div className="skeleton-explore-wrapper">
                    <div className="skeleton-explore"></div>
                    <div className="skeleton-explore"></div>
                    <div className="skeleton-explore"></div>
                    <div className="skeleton-explore"></div>
                  </div>
                  <div className="skeleton-explore-wrapper">
                    <div className="skeleton-explore"></div>
                    <div className="skeleton-explore"></div>
                    <div className="skeleton-explore"></div>
                    <div className="skeleton-explore"></div>
                  </div>
                </>
              ) : (
                <ExploreItems exploreData={explore} />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
