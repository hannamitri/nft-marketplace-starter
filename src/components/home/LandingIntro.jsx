import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init()

const LandingIntro = () => {
  return (
    <section id="section-intro" className="no-top no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div data-aos="fade-in" className="feature-box f-boxed style-3">
              <i data-aos="fade-up" className="bg-color-2 i-boxed icon_wallet"></i>
              <div data-aos="fade-up" className="text">
                <h4 className="">Set up your wallet</h4>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_wallet"></i>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div data-aos="fade-in" className="feature-box f-boxed style-3">
              <i data-aos="fade-up" className="bg-color-2 i-boxed icon_cloud-upload_alt"></i>
              <div data-aos="fade-up" className="text">
                <h4 className="">Add your NFT's</h4>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_cloud-upload_alt"></i>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div data-aos="fade-in" className="feature-box f-boxed style-3">
              <i data-aos="fade-up" className="bg-color-2 i-boxed icon_tags_alt"></i>
              <div data-aos="fade-up" className="text">
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
