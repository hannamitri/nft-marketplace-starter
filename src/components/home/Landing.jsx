import React, { useEffect } from "react";
import NFT from "../../images/nft.png";
import backgroundImage from "../../images/bg-shape-1.jpg";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS CSS file

const Landing = () => {
  useEffect(() => {
  AOS.init({
      duration: 1000, // Global animation duration
      once: false,    // Whether animation should happen only once - while scrolling down
    });
    // AOS.refresh() can be called here if you are dynamically loading content
  }, []); // Empty dependency array ensures this runs once when the component mounts
  return (
    <section
      id="section-hero"
      aria-label="section"
      className="no-top no-bottom vh-100" 
      data-aos="fade-in"
      data-bgimage="url(images/bg-shape-1.jpg) bottom"
      style={{ background: `url(${backgroundImage}) bottom / cover` }}
    >
      <div className="v-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6" data-aos="fade-up">
              <div className="spacer-single"></div>
              <h6>
                <span className="text-uppercase id-color-2">
                  Ultraverse Market
                </span>
              </h6>
              <div className="spacer-10"></div>
              <h1>Create, sell or collect digital items.</h1>
              <p className="lead">
                Unit of data stored on a digital ledger, called a blockchain,
                that certifies a digital asset to be unique and therefore not
                interchangeable
              </p>
              <div className="spacer-10"></div>
              <Link className="btn-main lead" to="/explore">
                Explore
              </Link>
              <div className="mb-sm-30"></div>
            </div>
            <div className="col-md-6 xs-hide">
              <img src={NFT} className="lazy img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
