import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./HotCollections.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );

        setCollections(response.data);
      } catch (error) {
        console.error("Unable to load hot collections:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  const options = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      576: { items: 1 },
      768: { items: 3 },
      992: { items: 4 },
    },
  };

  const collectionSkeleton = (
    <div className="item">
      <div className="nft_coll">
        <Skeleton width="100%" height="180px" borderRadius="10px 10px 0 0" />

        <div className="nft_coll_pp">
          <Skeleton width="60px" height="60px" borderRadius="50%" />
        </div>

        <div className="nft_coll_info">
          <Skeleton width="120px" height="20px" borderRadius="4px" />
          <Skeleton width="70px" height="16px" borderRadius="4px" />
        </div>
      </div>
    </div>
  );

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
          <div className="col-lg-12 hot-collections">
            {loading ? (
              <div className="row">
                {new Array(4).fill(0).map((_, index) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 col-12"
                    key={index}
                  >
                    {collectionSkeleton}
                  </div>
                ))}
              </div>
            ) : (
              <OwlCarousel className="owl-theme" {...options}>
                {collections.map((collection) => (
                  <div className="item" key={collection.id}>
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
                            alt={`${collection.title} creator`}
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
