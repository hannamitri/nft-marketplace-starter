import React from "react";

const INTRO_CARDS = [
  {
    title: "Set up your wallet",
    icon: "icon_wallet",
  },
  {
    title: "Add your NFT's",
    icon: "icon_cloud-upload_alt",
  },
  {
    title: "Sell your NFT's",
    icon: "icon_tags_alt",
  },
];

const LandingIntro = () => {
  return (
    <section id="section-intro" className="no-top no-bottom">
      <div className="container">
        <div className="row">
          {INTRO_CARDS.map((card, index) => (
            <div
              className="col-lg-4 col-md-6 mb-sm-30"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              key={card.title}
            >
              <div className="feature-box f-boxed style-3">
                <i className={`bg-color-2 i-boxed ${card.icon}`}></i>
                <div className="text">
                  <h4>{card.title}</h4>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem.
                  </p>
                </div>
                <i className={`wm ${card.icon}`}></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingIntro;
