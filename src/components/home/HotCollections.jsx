import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../css/styles/style.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
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

            {[1, 2, 3, 4].map((item) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item}
              >
                <div className="skeleton-card">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-profile"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-code"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const options = {
    loop: true,
    margin: 8,
    nav: true,
    dots: false,
    items: 4,
    slideBy: 1,

    navText: ["‹", "›"],

    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      992: {
        items: 4,
      },
    },
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
            <OwlCarousel
              className="owl-theme"
              {...options}
            >
              {collections.map((collection) => (
                <div className="item" key={collection.id}>

                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="nft_coll">

                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt={collection.title}
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt={collection.title}
                          />
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
