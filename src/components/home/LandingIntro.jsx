import React, { useEffect }  from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const LandingIntro = () => {

  useEffect(() => {
    AOS.init({duration:2500});
  })


  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  });
  
  // Restore the scroll position after refresh
  window.addEventListener('load', () => {
    if (sessionStorage.getItem('scrollPosition')) {
      window.scrollTo(0, sessionStorage.getItem('scrollPosition'));
      sessionStorage.removeItem('scrollPosition');
    }
  });
  
  return (
    <section id="section-intro" className="no-top no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3" >
              <i className="bg-color-2 i-boxed icon_wallet" data-aos="fade-in" ></i>
              <div className="text">
                <h4 className="">Set up your wallet</h4>
                <div data-aos="fade-in" >
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
                </div>
              </div>
              <i className="wm icon_wallet"></i>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i className="bg-color-2 i-boxed icon_cloud-upload_alt" data-aos="fade-in"></i>
              <div className="text">
                <h4 className="">Add your NFT's</h4>
                <div data-aos="fade-in">
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
                </div>
              </div>
              <i className="wm icon_cloud-upload_alt"></i>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i className="bg-color-2 i-boxed icon_tags_alt" data-aos="fade-in"></i>
              <div className="text">
                <h4 className="">Sell your NFT's</h4>
                <div data-aos="fade-in">
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
                </div>
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
