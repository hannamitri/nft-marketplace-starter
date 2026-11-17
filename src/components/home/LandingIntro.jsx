import React from "react";

const LandingIntro = () => {
  return (
    <section id="section-intro" className="container-fluid px-4 px-lg-5 py-5 my-4">
      <div className="row g-1 justify-content-center w-100 align-items-stretch m-0 ">
        
        {/* Box 1: Set up your wallet */}
        <div className="col-lg-4 col-md-6 col-12 h-100">
          <div className="intro-card h-100 d-flex flex-column justify-content-between p-4 bg-white border rounded-4 shadow-sm">

            <i className="intro-icon icon_wallet"></i>
            <div className="intro-text">
              <h4>Set up your wallet</h4>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem.
              </p>
            </div>
            <i className="intro-watermark icon_wallet"></i>
          </div>
        </div>

        {/* Box 2: Add your NFTs */}
        <div className="col-lg-4 col-md-6 col-12">
          <div className="intro-card">
            <i className="intro-icon icon_cloud-upload_alt"></i>
            <div className="intro-text">
              <h4>Add your NFT's</h4>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem.
              </p>
            </div>
            <i className="intro-watermark icon_cloud-upload_alt"></i>
          </div>
        </div>

        {/* Box 3: Sell your NFTs */}
        <div className="col-lg-4 col-md-6 col-12">
          <div className="intro-card">
            <i className="intro-icon icon_tags_alt"></i>
            <div className="intro-text">
              <h4>Sell your NFT's</h4>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem.
              </p>
            </div>
            <i className="intro-watermark icon_tags_alt"></i>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandingIntro;