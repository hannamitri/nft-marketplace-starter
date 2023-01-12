import React from "react";
import { Link } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";

const BrowseByCategory = () => {
  Aos.init();

  return (
    <section id="section-category" className="no-top">
      <div className="container">
        <div className="row">
          <div
            data-aos="fade-in"
            data-aos-delay="200"
            data-aos-duration="1000"
            className="col-lg-12"
          >
            <div className="text-center">
              <h2>Browse by category</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="1000"
            className="col-md-2 col-sm-4 col-6 mb-sm-30"
          >
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-image"></i>
              <span>Art</span>
            </Link>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="250"
            data-aos-duration="1000"
            className="col-md-2 col-sm-4 col-6 mb-sm-30"
          >
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-music"></i>
              <span>Music</span>
            </Link>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-duration="1000"
            className="col-md-2 col-sm-4 col-6 mb-sm-30"
          >
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-search"></i>
              <span>Domain Names</span>
            </Link>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="350"
            data-aos-duration="1000"
            className="col-md-2 col-sm-4 col-6 mb-sm-30"
          >
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-globe"></i>
              <span>Virtual Worlds</span>
            </Link>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="400"
            data-aos-duration="1000"
            className="col-md-2 col-sm-4 col-6 mb-sm-30"
          >
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-vcard"></i>
              <span>Trading Cards</span>
            </Link>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="450"
            data-aos-duration="1000"
            className="col-md-2 col-sm-4 col-6 mb-sm-30"
          >
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-th"></i>
              <span>Collectibles</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
