import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css"

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function fetchCollections() {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      );
      setCollections(response.data);
      setLoading(false);
    }
    fetchCollections();
  }, []);

  useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
  };

return (
  <section id="section-collections" className="no-bottom">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="slider-container">
            {loading ? (
              <div className="skeleton-row">
                {new Array(4).fill(0).map((_, index) => (
                  <div className="skeleton-card" key={index}>
                    <div className="skeleton-img"></div>
                    <div className="skeleton-avatar"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text short"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <button className="slider-btn slider-prev" onClick={() => sliderRef.current.slickPrev()}>
                  <i className="fa fa-chevron-left"></i>
                </button>
                <Slider ref={sliderRef} {...settings}>
                  {collections.map((item, index) => (
                    <div key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${item.nftId}`}>
                            <img src={item.nftImage} className="lazy img-fluid" alt="" />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img className="lazy pp-coll" src={item.authorImage} alt="" />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{item.title}</h4>
                          </Link>
                          <span>ERC-{item.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
                <button className="slider-btn slider-next" onClick={() => sliderRef.current.slickNext()}>
                  <i className="fa fa-chevron-right"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

export default HotCollections;