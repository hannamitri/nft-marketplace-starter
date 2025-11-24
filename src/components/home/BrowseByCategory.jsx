import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

const BrowseByCategory = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const handleLoad = () => {
      AOS.refresh();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <section
      id="section-category"
      className="no-top"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="text-center"
              data-aos="fade-down"
              data-aos-delay="300"
            >
              <h2>Browse by category</h2>
              <div
                className="small-border bg-color-2"
                data-aos="fade-right"
                data-aos-delay="800"
              ></div>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i
                className="fa fa-image"
                data-aos="fade-right"
                data-aos-delay="400"
              ></i>
              <span>Art</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i
                className="fa fa-music"
                data-aos="fade-right"
                data-aos-delay="500"
              ></i>
              <span>Music</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i
                className="fa fa-search"
                data-aos="fade-right"
                data-aos-delay="600"
              ></i>
              <span>Domain Names</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i
                className="fa fa-globe"
                data-aos="fade-right"
                data-aos-delay="700"
              ></i>
              <span>Virtual Worlds</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i
                className="fa fa-vcard"
                data-aos="fade-right"
                data-aos-delay="800"
              ></i>
              <span>Trading Cards</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i
                className="fa fa-th"
                data-aos="fade-right"
                data-aos-delay="900"
              ></i>
              <span>Collectibles</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
