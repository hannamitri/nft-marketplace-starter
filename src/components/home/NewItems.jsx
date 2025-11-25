import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import DynamicCard from "./DynamicCard";
import CountdownTimer from "./CountdownTimer";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

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
    height: 420px;
    margin: 8px;
  }
  .nft__item {
    min-height: 420px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 12px;
    background: #fff;
    padding-bottom: 16px;
    box-shadow: 0 1px 10px rgba(34,34,34,0.05);
  }
  .nft__item_wrap img {
    height: 220px;
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
  .carousel-container { position: relative; }
  .owl-nav button {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    background: rgba(34,33,34,0.7);
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
  .owl-nav .owl-prev { left: 10px; border: none; }
  .owl-nav .owl-next { right: 10px; border: none; }
  .fa-chevron-left, .fa-chevron-right { color: white; }
  .fa-chevron-left { padding-right: 4px; }
  .fa-chevron-right { padding-left: 4px; }
`;

const SkeletonCard = () => <div className="skeleton-card" />;

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.slice(0, 7));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const responsiveSettings = {
    0: { items: 1 },
    600: { items: 2 },
    900: { items: 3 },
    1200: { items: 4 },
  };

  return (
    <>
      <style>{skeletonStyles}</style>
      <section id="section-items" className="no-bottom">
        <div className="container carousel-container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 data-aos="fade-down" data-aos-delay="101">
                New Items
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
                responsive={responsiveSettings}
                smartSpeed={500}
                slideBy={1}
                lazyLoad
              >
                {items.map((item) => (
                  <DynamicCard key={item.id} item={item} />
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewItems;
