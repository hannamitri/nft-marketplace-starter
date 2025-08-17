import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CountdownTimer from "../reused/CountdownTimer";
import NFTItem from "../reused/NFTItem";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        setItems(response.data);
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  useEffect(() => {
    if (items.length > 0 && carouselRef.current && window.$ && !loading) {
      const $carousel = window.$(carouselRef.current);

      if ($carousel.hasClass("owl-loaded")) {
        $carousel.trigger("destroy.owl.carousel");
      }

      $carousel.owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: false,
        responsive: {
          0: {
            items: 1,
          },
          576: {
            items: 2,
          },
          768: {
            items: 3,
          },
          992: {
            items: 4,
          },
        },
        navText: [
          '<i class="fa fa-chevron-left" style="font-size: 16px;"></i>',
          '<i class="fa fa-chevron-right" style="font-size: 16px;"></i>',
        ],
      });

      return () => {
        if ($carousel.hasClass("owl-loaded")) {
          $carousel.trigger("destroy.owl.carousel");
        }
      };
    }
  }, [items, loading]);

  const SkeletonItem = () => (
    <div className="item">
      <div className="nft__item">
        <div className="author_list_pp">
          <div
            className="skeleton__avatar"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#e0e0e0",
              borderRadius: "50%",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          ></div>
        </div>
        <div className="nft__item_wrap">
          <div
            className="skeleton__image"
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: "#e0e0e0",
              borderRadius: "10px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          ></div>
        </div>
        <div className="nft__item_info">
          <div
            className="skeleton__title"
            style={{
              width: "60%",
              height: "20px",
              backgroundColor: "#e0e0e0",
              borderRadius: "4px",
              marginBottom: "8px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          ></div>
          <div
            className="skeleton__price"
            style={{
              width: "40%",
              height: "16px",
              backgroundColor: "#e0e0e0",
              borderRadius: "4px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="section-items" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up" data-aos-delay="100">
                New Items
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            {loading ? (
              <div className="row">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={index}
                  >
                    <SkeletonItem />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="owl-carousel owl-theme new__items--carousel"
                ref={carouselRef}
              >
                {items.map((item) => (
                  <NFTItem
                    key={item.id}
                    item={item}
                    className="item"
                    showCountdown={true}
                    showShareButtons={true}
                    showBuyButton={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default NewItems;
