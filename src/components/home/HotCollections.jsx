import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import "slick-carousel/slick/slick.css";
import "./HotCollections.css";

const COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const CollectionArrow = ({ direction, onClick }) => (
  <button
    type="button"
    className={`hot-collections-arrow hot-collections-arrow--${direction}`}
    aria-label={`${direction === "next" ? "Next" : "Previous"} collection`}
    onClick={onClick}
    disabled={!onClick}
  >
    <span aria-hidden="true">{direction === "next" ? "›" : "‹"}</span>
  </button>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadCollections = async () => {
      try {
        const response = await fetch(COLLECTIONS_URL, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Unable to load collections");
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid collections response");
        if (!controller.signal.aborted) setCollections(data);
      } catch (error) {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadCollections();
    return () => controller.abort();
  }, []);

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: collections.length > 4,
    arrows: collections.length > 4,
    dots: false,
    autoplay: false,
    draggable: false,
    swipe: false,
    touchMove: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          infinite: collections.length > 2,
          arrows: collections.length > 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          infinite: collections.length > 1,
          arrows: collections.length > 1,
        },
      },
    ],
    prevArrow: <CollectionArrow direction="previous" />,
    nextArrow: <CollectionArrow direction="next" />,
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
          <div className="col-12">
            {loading ? (
              <div className="hot-collections-loading" role="status" aria-busy="true">
                <span className="hot-collections-sr-only">Loading collections…</span>
                <div className="hot-collections-skeletons" aria-hidden="true">
                  {Array.from({ length: 4 }, (_, index) => (
                    <div className="hot-collections-slide" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width="100%" height="100%" />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton width="60px" height="60px" borderRadius="50%" />
                        </div>
                        <div className="nft_coll_info">
                          <Skeleton width="65%" height="19px" borderRadius="4px" />
                          <Skeleton width="35%" height="17px" borderRadius="4px" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <p role="alert" className="text-center">Unable to load collections. Please try again later.</p>
            ) : collections.length === 0 ? (
              <p className="text-center">No collections available.</p>
            ) : (
              <Slider {...settings} className="hot-collections-slider">
                {collections.map((collection) => (
                  <div className="hot-collections-slide" key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img src={collection.nftImage} className="lazy img-fluid" alt={collection.title} />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img className="lazy pp-coll" src={collection.authorImage} alt="" />
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
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
