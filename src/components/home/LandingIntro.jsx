import React, { useEffect } from "react";
// 1. Import AOS and its styles
import AOS from "aos";
import "aos/dist/aos.css";

const LandingIntro = () => {
  // 2. Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 900, // Slightly snappier duration for sequential cards
      once: false, // Triggers animation only once on scroll
    });
  }, []);

  return (
    <section id="section-intro" className="no-top no-bottom">
      <div className="container">
        <div className="row">
          {/* Card 1: Animates immediately */}
          <div
            className="col-lg-4 col-md-6 mb-sm-30"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div className="feature-box f-boxed style-3">
              <i className="bg-color-2 i-boxed icon_wallet"></i>
              <div className="text">
                <h4 className="">Set up your wallet</h4>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_wallet"></i>
            </div>
          </div>

          {/* Card 2: Delayed by 150ms */}
          <div
            className="col-lg-4 col-md-6 mb-sm-30"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="feature-box f-boxed style-3">
              <i className="bg-color-2 i-boxed icon_cloud-upload_alt"></i>
              <div className="text">
                <h4 className="">Add your NFT's</h4>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_cloud-upload_alt"></i>
            </div>
          </div>

          {/* Card 3: Delayed by 300ms */}
          <div
            className="col-lg-4 col-md-6 mb-sm-30"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="feature-box f-boxed style-3">
              <i className="bg-color-2 i-boxed icon_tags_alt"></i>
              <div className="text">
                <h4 className="">Sell your NFT's</h4>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_tags_alt"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingIntro;
