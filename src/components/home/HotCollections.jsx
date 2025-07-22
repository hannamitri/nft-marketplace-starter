import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const skeletonArray = [1, 2, 3, 4];

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 3, spacing: 16 }, // Show 3 at a time, adjust as needed
  });

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => res.json())
      .then((data) => {
        setCollections(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
          <div ref={sliderRef} className="keen-slider">
            {loading
              ? skeletonArray.map((_, index) => (
                  <div className="keen-slider__slide" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div className="skeleton skeleton-img" style={{ width: "100%", height: "200px", borderRadius: "8px" }}></div>
                      </div>
                      <div className="nft_coll_pp">
                        <div className="skeleton skeleton-avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <div className="skeleton skeleton-title" style={{ width: "60%", height: "20px", marginBottom: "8px" }}></div>
                        <div className="skeleton skeleton-code" style={{ width: "40%", height: "16px" }}></div>
                      </div>
                    </div>
                  </div>
                ))
              : collections.map((item, index) => (
                  <div className="keen-slider__slide" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
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
                        <span>{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;