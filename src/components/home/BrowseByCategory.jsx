import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Aos from 'aos';
import 'aos/dist/aos.css';

const BrowseByCategory = () => {

  useEffect(() => {
          Aos.init({
            easing: 'ease-in-out',
            duration: 800,
          });
        }, [])

  return (
    <section id="section-category" className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Browse by category</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos = "fade-right" data-aos-delay = "100" data-aot-duration = "200">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-image"></i>
              <span>Art</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos = "fade-right" data-aos-delay = "200" data-aot-duration = "200">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-music"></i>
              <span>Music</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos = "fade-right" data-aos-delay = "300" data-aot-duration = "200">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-search"></i>
              <span>Domain Names</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos = "fade-right" data-aos-delay = "400" data-aot-duration = "200">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-globe"></i>
              <span>Virtual Worlds</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos = "fade-right" data-aos-delay = "500" data-aot-duration = "200">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-vcard"></i>
              <span>Trading Cards</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos = "fade-right" data-aos-delay = "600" data-aot-duration = "200">
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
