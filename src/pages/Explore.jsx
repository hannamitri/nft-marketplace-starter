
import React, { useEffect } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* EXPLORE HEADER */}
        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div
            className="center-y relative text-center"
            data-aos="fade-in"
            data-aos-duration="800"
          >
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

        {/* EXPLORE NFT COLLECTION */}
        <section
          aria-label="section"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
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
