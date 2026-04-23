import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";



const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const skeletonItems = Array.from({ length: 4 });
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const getCollections = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const data = await response.json();
        setCollections(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCollections();
  }, []);

  if (loading)
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
            {skeletonItems.map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={`skeleton-${index}`}>
                <div className="nft_coll">
                  <div className="nft_wrap" style={{ height: "230px" }}>
                    <Skeleton width="100%" height="230px" borderRadius="6px" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton width="70%" height="20px" borderRadius="4px" />
                    <div className="mt-2">
                      <Skeleton width="45%" height="16px" borderRadius="4px" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  if (error) return <div className="text-center p-4 text-danger">Error: {error}</div>;

  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,

    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="120">
            <OwlCarousel className="owl-theme" {...carouselOptions}>
              {collections.map((collection, index) => (
                <div
                  className="nft_coll"
                  key={collection.id}
                  data-aos={isMobile ? "fade-up" : (index % 2 === 0 ? "flip-left" : "fade-up")}
                  data-aos-delay={isMobile ? (index % 3) * 40 : index * 70}
                >
                  <div className="nft_wrap" style={{ height: "230px" }}>
                    <Link to={`/item-details/${collection.nftId}`}>
                      <img src={collection.nftImage} className="lazy img-fluid" alt={collection.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Link>
                  </div>
                  <div className="nft_coll_pp" style={{ marginTop: "-30px" }}>
                    <Link to={`/author/${collection.authorId}`}>
                      <img className="lazy pp-coll" src={collection.authorImage} alt={collection.title} />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>ERC-{collection.code}</span>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
