import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../css/styles/Carousel.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getNfts() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
      );
      setNfts(data);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error loading NFTs:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getNfts();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    touchDrag: true,
    mouseDrag: true,
    pullDrag: true,
    responsive: {
      0: {
        items: 1,
        dots: true,
      },
      500: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: true,
      },
      800: {
        items: 3,
        nav: true,
      },
      1240: {
        items: 4,
        nav: true,
      },
    },
  };

  if (loading) {
    return (
      <div className="skeleton__carousel">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="skelton__item">
            <div className="nft_coll skeleton">
              <div className="nft_wrap skeleton__image"></div>
              <div className="nft_coll_pp skeleton__avatar"></div>
              <div className="nft_coll_info skeleton">
                <div className="skeleton__title"></div>
                <div className="skeleton__text"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <OwlCarousel className="owl-theme" key={nfts.length} {...options}>
        {nfts.map((nft, index) => (
          <div key={index}>
            <div className="nft_coll">
              <div className="nft_wrap">
                <Link to="/item-details">
                  <img src={nft.nftImage} className="lazy img-fluid" alt="" />
                </Link>
              </div>
              <div className="nft_coll_pp">
                <Link to="/author">
                  <img className="lazy pp-coll" src={nft.authorImage} alt="" />
                </Link>
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
                <Link to="/explore">
                  <h4>{nft.title}</h4>
                </Link>
                <span>ERC-{nft.code}</span>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
};

export default Carousel;
