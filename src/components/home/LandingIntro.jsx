import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'

const LandingIntro = () => {
   AOS.init();
   AOS.refresh();
  return (
    <section id="section-intro" className="no-top no-bottom">
      <div className="container">
        <div className="row" data-aos="fade" data-aos-duration="1000">
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i data-aos="fade-up" data-aos-delay="100" className="bg-color-2 i-boxed icon_wallet"></i>
              <div className="text">
                <h4 data-aos="fade-up" data-aos-delay="300" className="">Set up your wallet</h4>
                <p data-aos="fade-up" data-aos-delay="600">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_wallet"></i>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i data-aos="fade-up" data-aos-delay="100" className="bg-color-2 i-boxed icon_cloud-upload_alt"></i>
              <div className="text">
                <h4 data-aos="fade-up" data-aos-delay="300" className="">Add your NFT's</h4>
                <p data-aos="fade-up" data-aos-delay="600">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_cloud-upload_alt"></i>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i data-aos="fade-up" data-aos-delay="100" className="bg-color-2 i-boxed icon_tags_alt"></i>
              <div className="text">
                <h4 data-aos="fade-up" data-aos-delay="300" className="">Sell your NFT's</h4>
                <p data-aos="fade-up" data-aos-delay="600">
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
