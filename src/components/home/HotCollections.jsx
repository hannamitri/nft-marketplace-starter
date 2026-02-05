import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setCollections(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load collections. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
    return () => controller.abort();
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
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <OwlCarousel
            className="owl-theme"
            items={4}
            nav
            dots={false}
            margin={16}
            loop
            key={loading ? "loading" : collections.length}
            responsive={{
              0: { items: 1 },
              600: { items: 2 },
              992: { items: 3 },
              1200: { items: 4 },
            }}
          >
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div className="item" key={index}>
                  <Skeleton width="100%" height="200px" borderRadius="10px" />
                </div>
              ))
            ) : (
              collections.slice(0, 6).map((collection, index) => (
                <div className="item" key={collection?.id ?? collection?.nftId ?? index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection?.nftId ?? ""}`}>
                        <img
                          src={collection?.nftImage}
                          className="lazy img-fluid"
                          alt={collection?.title || "NFT item"}
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection?.authorId ?? ""}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection?.authorImage}
                          alt="Author"
                          loading="lazy"
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection?.title || "Untitled"}</h4>
                      </Link>
                      <span>ERC-{collection?.code ?? ""}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
