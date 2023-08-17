import React, { useEffect } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = ({
  exploreItemsUsersData,
  setExploreItemsUsersData,
  newItemsLoading,
  exploreItemsLoading,
  setExploreItemsLoading,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
            <div
              className="row"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <ExploreItems
                exploreItemsUsersData={exploreItemsUsersData}
                setExploreItemsUsersData={setExploreItemsUsersData}
                newItemsLoading={newItemsLoading}
                exploreItemsLoading={exploreItemsLoading}
                setExploreItemsLoading={setExploreItemsLoading}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
