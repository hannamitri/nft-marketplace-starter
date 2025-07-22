import React, { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Link } from "react-router-dom";

const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 6, spacing: 16 }, // Adjust perView as needed
  });

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => res.json())
      .then((data) => {
        setSellers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="section-top-sellers" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
          </div>
          <div ref={sliderRef} className="keen-slider">
            {loading
              ? skeletonArray.map((_, idx) => (
                  <div className="keen-slider__slide" key={idx}>
                    <div className="nft_coll">
                      <div className="nft_coll_pp">
                        <div className="skeleton skeleton-avatar" style={{ width: "60px", height: "60px", borderRadius: "50%" }}></div>
                      </div>
                      <div className="nft_coll_info">
                        <div className="skeleton skeleton-title" style={{ width: "80px", height: "20px", marginBottom: "8px" }}></div>
                        <div className="skeleton skeleton-code" style={{ width: "40px", height: "16px" }}></div>
                      </div>
                    </div>
                  </div>
                ))
              : sellers.map((seller, idx) => (
                  <div className="keen-slider__slide" key={idx}>
                    <div className="nft_coll">
                      <div className="nft_coll_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img className="lazy pp-coll" src={seller.authorImage} alt={seller.authorName} />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to={`/author/${seller.authorId}`}>
                          <h4>{seller.authorName}</h4>
                        </Link>
                        <span>{seller.price} ETH</span>
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

export default TopSellers;