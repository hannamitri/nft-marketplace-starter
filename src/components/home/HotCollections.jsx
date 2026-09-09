import React from "react";
import HotCollectionsCarousel from "../HotCollectionsCarousel.jsx";



const HotCollections = () => {
  

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <HotCollectionsCarousel />
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
