import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import AOS from "aos";
import "aos/dist/aos.css";

const skeletonStyles = `
  .skeleton-card {
    background: linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 37%,
      #f0f0f0 64%
    );
    background-size: 400% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 12px;
    height: 300px;
    margin: 8px;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .carousel-container {
    position: relative;
  }
  /* Override Owl navigation buttons */
  .owl-nav button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(34,34,34,0.7);
    border-radius: 50%;
    border: none;
    width: 40px;
    height: 40px;
    color: white;
    font-size: 22px;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.4s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .owl-nav button:hover {
    transform: translateY(-50%) scale(1.3);
    background-color: grey;
  }
    .owl-nav {
    border:none;
    }
  .owl-nav .owl-prev {
    left: 8px;
    bottom: 12px;
  }
  .owl-nav .owl-next {
    right: 8px;
    bottom: 12px;
    }
    
  .fa-chevron-left, .fa-chevron-right {
    color: white;
  }
  .fa-chevron-left {
    padding-right: 4px;
  }
  .fa-chevron-right {
    padding-left: 4px;
  }
`;

const SkeletonCard = () => <div className="skeleton-card" />;

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((res) => {
        setCollections(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const responsive = {
    1: { items: 1 },
    600: { items: 2 },
    900: { items: 3 },
    1200: { items: 4 },
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const handleLoad = () => {
      AOS.refresh();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      <style>{skeletonStyles}</style>
      <section id="section-collections" className="no-bottom">
        <div className="container carousel-container">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12 text-center">
              <h2 data-aos="fade-down" data-aos-delay="300">
                Hot Collections
              </h2>
              <div
                className="small-border bg-color-2"
                data-aos="fade-right"
                data-aos-delay="800"
              ></div>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center col-12">
                {[...Array(4)].map((_, idx) => (
                  <SkeletonCard key={idx} />
                ))}
              </div>
            ) : (
              <OwlCarousel
                className="owl-theme"
                loop
                margin={16}
                nav
                navText={[
                  '<i class="fa fa-chevron-left"></i>',
                  '<i class="fa fa-chevron-right"></i>',
                ]}
                responsive={responsive}
                smartSpeed={500}
                slideBy={1}
                lazyLoad
              >
                {collections.map((item) => (
                  <div
                    key={item.id}
                    className="nft_coll"
                    style={{ margin: "0 8px" }}
                  >
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          alt={item.title}
                          loading="lazy"
                          className="lazy img-fluid"
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          src={item.authorImage}
                          alt={item.title}
                          loading="lazy"
                          className="lazy pp-coll"
                        />
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
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HotCollections;
