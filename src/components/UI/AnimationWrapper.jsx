import React, { useEffect } from "react";
import AOS from "aos";

const AnimationWrapper = () => {
  useEffect(() => {
    AOS.init();

    const paragraphs = document.querySelectorAll("p");
    const buttons = document.querySelectorAll("button");
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    paragraphs.forEach((p) => {
      p.setAttribute("data-aos", "data-aos-duration=2000", "fade-up");
    });

    buttons.forEach((btn) => {
      btn.setAttribute("data-aos", "data-aos-duration=2000", "fade-up");
    });

    headings.forEach((heading) => {
      heading.setAttribute("data-aos", "data-aos-duration=2000", "zoom-in");
    });

    <div className="nft-collection" data-aos="zoom-in" data-aos-duration="2000">
      {nftDetails.map((nft) => (
        <div className="nft-card" key={nft.id}>
          <img src={nft.image} alt={nft.title} />
          <h3>{nft.title}</h3>
          <p>{nft.description}</p>
          <button>View Details</button>
        </div>
      ))}
    </div>;
  }, []);

  return <div></div>;
};

export default AnimationWrapper;
