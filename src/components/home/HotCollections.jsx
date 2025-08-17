import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  useEffect(() => {
    if (collections.length > 0 && carouselRef.current && window.$ && !loading) {
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
  }, [collections, loading]);

  const SkeletonItem = () => (
    <div className="item">
      <div className="nft_coll">
        <div className="nft_wrap">
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
        <div className="nft_coll_pp">
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
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <div
            className="skeleton__title"
            style={{
              width: "60%",
              height: "20px",
              backgroundColor: "#e0e0e0",
              borderRadius: "4px",
              marginBottom: "8px",
              marginLeft: "auto",
              marginRight: "auto",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          ></div>
          <div
            className="skeleton__subtitle"
            style={{
              width: "40%",
              height: "16px",
              backgroundColor: "#e0e0e0",
              borderRadius: "4px",
              marginLeft: "auto",
              marginRight: "auto",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="section-collections" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up" data-aos-delay="100">
                Hot Collections
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
                className="owl-carousel owl-theme hot__collections--carousel"
                ref={carouselRef}
              >
                {collections.map((collection) => (
                  <div className="item" key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt={collection.title}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
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

export default HotCollections;
