import React from "react";
import ExploreItems from "../components/explore/ExploreItems";
import SubHeader from "../images/subheader.jpg";

const Explore = () => {
  return (
    <>
      <section
        id="subheader"
        className="text-light"
        style={{
          backgroundImage: `url(${SubHeader})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Explore</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THIS IS YOUR API SECTION */}
      <section aria-label="section">
        <div className="container">
          <ExploreItems />
        </div>
      </section>
    </>
  );
};

export default Explore;
