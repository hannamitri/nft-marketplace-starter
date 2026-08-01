import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HOT_COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 576,
      settings: { slidesToShow: 1 },
    },
  ],
};

const CollectionSkeletonCard = () => (
  <div className="nft_coll hot-collection-skeleton" aria-hidden="true">
    <Skeleton width="100%" height="200px" borderRadius="10px 10px 0 0" />
    <div className="nft_coll_pp">
      <Skeleton width="60px" height="60px" borderRadius="50%" />
      <i className="fa fa-check"></i>
    </div>
    <div className="hot-collection-skeleton-info">
      <Skeleton width="72px" height="15px" borderRadius="2px" />
      <Skeleton width="42px" height="13px" borderRadius="2px" />
    </div>
  </div>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const { data } = await axios.get(HOT_COLLECTIONS_URL);
        setCollections(data.slice(0, 6));
      } catch (requestError) {
        console.error("Unable to fetch hot collections:", requestError);
        setError("Unable to load hot collections. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  return (
    <section
      id="section-collections"
      className="no-bottom"
      data-aos="fade-up"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {error && (
            <div className="col-12 text-center" role="alert">
              <p>{error}</p>
            </div>
          )}
          {loading && (
            <div className="col-12" role="status" aria-live="polite">
              <span className="sr-only">Loading hot collections...</span>
              <Slider {...sliderSettings} className="hot-collections-slider">
                {Array.from({ length: 6 }, (_, index) => (
                  <CollectionSkeletonCard key={index} />
                ))}
              </Slider>
            </div>
          )}
          {!loading && collections.length > 0 && (
            <div className="col-12">
              <Slider {...sliderSettings} className="hot-collections-slider">
                {collections.map((collection) => (
                  <div key={collection.id}>
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
                            alt={`${collection.title} creator`}
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
              </Slider>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
