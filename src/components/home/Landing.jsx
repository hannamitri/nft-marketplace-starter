import React, { useEffect } from "react";
import NFT from "../../images/nft.png";
import backgroundImage from "../../images/bg-shape-1.jpg";
import { Link } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css';

const Landing = () => {
  useEffect(() => {
    Aos.init();
  },[])
  return (
    <section
      id="section-hero"
      aria-label="section"
      className="no-top no-bottom vh-100"
      data-bgimage="url(images/bg-shape-1.jpg) bottom"
      style={{ background: `url(${backgroundImage}) bottom / cover` }}
    >
      <div className="v-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6" data-aos="fade-right" data-aos-easing="ease-in-out" data-aos-duration="1500">
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
            <div className="col-md-6 xs-hide" data-aos="fade-left" data-aos-easing="ease-in-out" data-aos-duration="2000" data-aos-delay="1000">
              <img src={NFT} className="lazy img-fluid" alt=""  />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
