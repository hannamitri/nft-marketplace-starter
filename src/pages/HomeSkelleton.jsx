import React from "react";

const HomeSkeleton = () => {
  const placeholderArray = Array(4).fill(0); // for items, hot collections, top sellers, etc.

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Landing Skeleton */}
        <section style={{ height: "400px", background: "#eee", marginBottom: "30px" }}></section>

        {/* Landing Intro Skeleton */}
        <section style={{ height: "150px", background: "#eee", marginBottom: "30px" }}></section>

        {/* Hot Collections Carousel Skeleton */}
        <section className="container mb-4">
          <div className="row">
            {placeholderArray.map((_, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 mb-3">
                <div style={{ width: "100%", height: "200px", background: "#ddd", borderRadius: "8px" }}></div>
              </div>
            ))}
          </div>
        </section>

        {/* New Items Skeleton */}
        <section className="container mb-4">
          <div className="row">
            {placeholderArray.map((_, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 mb-3">
                <div style={{ width: "100%", height: "200px", background: "#ddd", borderRadius: "8px" }}></div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Sellers Skeleton */}
        <section className="container mb-4">
          <div className="row">
            {placeholderArray.map((_, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 mb-3">
                <div style={{ width: "100%", height: "120px", background: "#ccc", borderRadius: "50%" }}></div>
                <div style={{ width: "60%", height: "20px", background: "#eee", marginTop: "10px", borderRadius: "4px" }}></div>
              </div>
            ))}
          </div>
        </section>

        {/* Browse By Category Skeleton */}
        <section className="container mb-4">
          <div className="row">
            {placeholderArray.map((_, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 mb-3">
                <div style={{ width: "100%", height: "100px", background: "#ddd", borderRadius: "8px" }}></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeSkeleton;
