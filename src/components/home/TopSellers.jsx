import React, { useState, useEffect } from "react";

import TopSellersUI from "../UI/TopSellersUI";

const TopSellers = () => {


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <TopSellersUI />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
