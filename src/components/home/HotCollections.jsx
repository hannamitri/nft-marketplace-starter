import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css"; // Make sure this file exists

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const data = await response.json();
        setCollections(data.slice(0, 6));
      } catch (error) {
        // handle error if needed
      }
    }

    fetchCollections();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleImageClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setRedirect(true);
    }, 500);
  };

  useEffect(() => {
    if (redirect) {
      navigate("/item-details");
    }
  }, [redirect, navigate]);

  if (isLoading) {
    return (
      <div className="container text-center" style={{ padding: "100px" }}>
        <div className="shimmer-wrapper">
          <div className="shimmer" />
        </div>
        <p>Loading collection...</p>
      </div>
    );
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <Slider {...sliderSettings}>
          {collections.map((item, index) => (
            <div key={index} className="text-center p-3">
              <div className="nft_coll">
                <div className="nft_wrap">
                  <button
                    onClick={handleImageClick}
                    style={{ border: "none", background: "none", padding: 0 }}
                  >
                    <img
                      src={item.nftImage}
                      className="lazy img-fluid"
                      alt={item.title}
                      style={{
                        width: "100%",
                        maxHeight: "300px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </button>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img
                      className="lazy pp-coll"
                      src={item.authorImage}
                      alt={item.author}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginTop: "10px",
                      }}
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{item.title}</h4>
                  </Link>
                  <span>{item.code || "ERC-192"}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HotCollections;
