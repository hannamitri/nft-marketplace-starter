import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const BrowseByCategory = () => {
  
  // 2. Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 900, // Animation speed for each element
      once: false,    // Triggers animation only once on scroll
    });
  }, []);

  return (
    <section id="section-category" className="no-top">
      <div className="container">
        <div className="row">
          
          {/* 3. Added AOS fade-up to the section title */}
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>Browse by category</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* 4. Added staggered delays to each category card column */}
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos="fade-left" data-aos-delay="0">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-image"></i>
              <span>Art</span>
            </Link>
          </div>
          
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos="fade-left" data-aos-delay="100">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-music"></i>
              <span>Music</span>
            </Link>
          </div>
          
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos="fade-left" data-aos-delay="200">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-search"></i>
              <span>Domain Names</span>
            </Link>
          </div>
          
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos="fade-left" data-aos-delay="300">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-globe"></i>
              <span>Virtual Worlds</span>
            </Link>
          </div>
          
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos="fade-left" data-aos-delay="400">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-vcard"></i>
              <span>Trading Cards</span>
            </Link>
          </div>
          
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos="fade-left" data-aos-delay="500">
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