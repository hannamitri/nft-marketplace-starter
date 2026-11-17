import React from "react";
import { Link } from "react-router-dom";
import NFT from "../../images/nft.png";
import backgroundImage from "../../images/bg-shape-1.jpg";


const Landing = () => {
  return (
    <section
      id="section-hero"
      aria-label="section"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container-fluid w-full px-5">
        <div className="row align-items-center">
          {/* Text Column */}
<div className="col-lg-6 col-md-12 text-center text-lg-start mb-5 mb-lg-0">
  <h6 className="text-uppercase id-color-2 landing-subheading mb-3">
    Ultraverse Market
  </h6>
  <h1 className="fw-bold landing-title mb-4">
    Create, sell or collect digital items.
  </h1>
  <p className="lead landing-lead mb-5">
    Unit of data stored on a digital ledger, called a blockchain,
    that certifies a digital asset to be unique and therefore not
    interchangeable
  </p>
  <Link className="btn-main lead landing-btn" to="/explore">
    Explore
  </Link>
</div>

          {/* Image Column */}
          <div className="col-lg-6 col-md-12 text-center">
            <img
              src={NFT}
              className="img-fluid landing-image"
              alt="NFT Showcase"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Landing;