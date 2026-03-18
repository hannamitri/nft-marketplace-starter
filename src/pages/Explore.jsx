import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreHeader from "../components/explore/HeaderExplore";
import ExploreItems from "../components/explore/ExploreItems";
import AOS from "aos";


const Explore = () => {
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [sortType]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url(${SubHeader}) top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <h1 data-aos="fade-down">Explore</h1>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row">

              <ExploreHeader setSortType={setSortType} />
              <ExploreItems sortType={sortType} />

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Explore;