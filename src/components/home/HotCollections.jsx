import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    )
      .then((response) => response.json())
      .then((data) => {
        setHotCollections(data);
      })
      .finally(() => setIsLoading(false));
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
          <div className="col-lg-12">
            {isLoading ? (
              <div className="row">
                {new Array(4).fill(0).map((_, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                    <div className="nft_coll skeleton-card"></div>
                  </div>
                ))}
              </div>
            ) : (
              <OwlCarousel
                className="owl-theme"
                margin={10}
                responsive={{
                  0: {
                    items: 1,
                  },
                  600: {
                    items: 2,
                  },
                  1000: {
                    items: 4,
                  },
                }}
                nav
                loop
              >
                {hotCollections.map((item) => (
                  <div key={item.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`item-details/${item.id}`}>
                          <img
                            src={item.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to={`item-details/${item.id}`}>
                          <img
                            src={item.authorImage}
                            className="lazy pp-coll"
                            alt=""
                          />
                        </Link>

                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Link to={`item-details/${item.id}`}>
                          <h4>{item.title}</h4>
                        </Link>

                        <span>ERC-{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
