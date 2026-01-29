import React from "react";
import LandingIntroCard from "../UI/LandingIntroCard";

const LandingIntro = () => {
  return (
    <section id="section-intro" className="no-top no-bottom">
      <div className="container">
        <div className="row">
          <LandingIntroCard 
            icon="bg-color-2 i-boxed icon_wallet"
            title="Set up your wallet" 
            description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem." 
            bgImage="wm icon_wallet"
          />
          <LandingIntroCard 
            icon="bg-color-2 i-boxed icon_cloud-upload_alt"
            title="Add your NFT's" 
            description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem." 
            bgImage="wm icon_cloud-upload_alt"
          />
          <LandingIntroCard 
            icon="bg-color-2 i-boxed icon_tags_alt"
            title="Sell your NFT's" 
            description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem." 
            bgImage="wm icon_tags_alt"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingIntro;
