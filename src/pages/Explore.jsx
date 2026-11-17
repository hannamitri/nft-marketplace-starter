import React, { useState, useEffect } from "react";
import HeaderExplore from "../components/explore/HeaderExplore";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Full-Width Purple Banner */}
      <section
        id="subheader"
        className="text-light w-100 mb-5"
        style={{
          background: "linear-gradient(135deg, #8364e2 0%, #5b3cc4 100%)",
          paddingTop: "140px",
          paddingBottom: "70px",
        }}
      >
        <div className="container text-center">
          <h1
            className="fw-bold display-4 text-white mb-0"
            data-aos="fade-down"
            data-aos-duration="700"
          >
            Explore
          </h1>
        </div>
      </section>

      {/* Main Content Section (Max-Width Constrained) */}
      <section
        aria-label="section"
        className="container-fluid px-5"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="150"
      >
        <div className="row">
          <HeaderExplore filter={filter} setFilter={setFilter} />
          <ExploreItems filter={filter} />
        </div>
      </section>
    </>
  );
};

export default Explore;