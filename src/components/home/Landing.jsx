import React, { useEffect } from "react";
import NFT from "../../images/nft.png";
import backgroundImage from "../../images/bg-shape-1.jpg";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';



const Landing = () => {

   useEffect(() => {
    window.scrollTo(0, 0);
    // Scroll to top when the component loads
    window.scrollTo(0, 0);
       // ✅ Initialize AOS
    AOS.init({
      duration: 2000, // animation duration (ms)
      once: true,     // whether animation should happen only once
      easing: "ease-in-out",
    })

      // Optional: refresh AOS if content updates dynamically
    AOS.refresh();
  }, []);
  

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

  {/* ✅ Add data-aos attributes wherever you want animations */}
         
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
          

            {/* ✅ Add data-aos attributes wherever you want animations */}
         
            <div className="col-md-6 xs-hide" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
              <img src={NFT} className="lazy img-fluid" alt="" />
            </div>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
