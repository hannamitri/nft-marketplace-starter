import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const carouselOptions = {
  className: "owl-theme",
  loop: true,
  nav: true,
  dots: false,
  slideBy: 1,
  margin: 15,
  navText: [
    '<i class="fa fa-chevron-left"></i>',
    '<i class="fa fa-chevron-right"></i>',
  ],
  responsive: {
    0: { items: 1 },
    576: { items: 2 },
    992: { items: 3 },
    1200: { items: 4 },
  },
};

const CollectionCard = ({ collection }) => (
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
);

const SkeletonCard = () => (
  <div className="nft_coll hot-collections-skeleton-card">
    <div className="nft_wrap">
      <Skeleton width="100%" height="100%" borderRadius="10px" />
    </div>
    <div className="nft_coll_pp">
      <Skeleton width="60px" height="60px" borderRadius="50%" />
    </div>
    <div className="nft_coll_info">
      <Skeleton width="120px" height="20px" borderRadius="4px" />
      <Skeleton width="60px" height="16px" borderRadius="4px" />
    </div>
  </div>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const minLoadingMs = 2000;

    const fetchCollections = async () => {
      const apiUrl =
        process.env.REACT_APP_HOT_COLLECTIONS_API ||
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

      const startTime = Date.now();

      try {
        const { data } = await axios.get(apiUrl);
        if (isMounted) {
          setCollections(data);
        }
      } catch (error) {
        console.error("Failed to fetch hot collections:", error);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = minLoadingMs - elapsed;

        if (remaining > 0) {
          await new Promise((resolve) => setTimeout(resolve, remaining));
        }

        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCollections();

    return () => {
      isMounted = false;
    };
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
          <div id="d-coll-carousel" className="col-lg-12">
            {loading ? (
              <OwlCarousel key="hot-collections-skeleton" {...carouselOptions}>
                {new Array(4).fill(0).map((_, index) => (
                  <div key={index}>
                    <SkeletonCard />
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              <OwlCarousel key="hot-collections-loaded" {...carouselOptions}>
                {collections.map((collection) => (
                  <div key={collection.id}>
                    <CollectionCard collection={collection} />
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
