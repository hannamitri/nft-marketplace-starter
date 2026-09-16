import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider({
    mode: "snap",
    loop: collections.length > 1,
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      "(min-width: 576px)": { slides: { perView: 2, spacing: 16 } },
      "(min-width: 768px)": { slides: { perView: 4, spacing: 16 } },
    },
    slideChanged(instance) {
      setCurrentSlide(instance.track.details.rel);
    },
  });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCollections() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
          { signal: controller.signal, timeout: 15000 }
        );
        if (!Array.isArray(data)) {
          throw new Error("Unexpected collection response");
        }
        if (!controller.signal.aborted) setCollections(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setError("Unable to load hot collections. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

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
          {loading && (
            <div className="col-12 hot-collections-skeleton" role="status" aria-label="Loading hot collections">
              {[0, 1, 2, 3].map((item) => (
                <div className="nft_coll hot-collection-placeholder" key={item} aria-hidden="true">
                  <Skeleton width="100%" height="200px" borderRadius="10px 10px 0 0" />
                  <div className="hot-collection-placeholder-info">
                    <Skeleton width="60px" height="60px" borderRadius="50%" />
                    <Skeleton width="65%" height="18px" borderRadius="4px" />
                    <Skeleton width="35%" height="14px" borderRadius="4px" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {error && <p className="col-12" role="alert">{error}</p>}
          {!loading && !error && collections.length === 0 && (
            <p className="col-12">No hot collections available.</p>
          )}
          {!loading && !error && collections.length > 0 && (
            <div className="col-12">
              <div className="hot-collections-carousel">
              <div ref={sliderRef} className="keen-slider hot-collections-slider" aria-label="Hot collections carousel">
                {collections.map((collection) => (
                  <div className="keen-slider__slide" key={collection.id}>
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
              </div>
              {collections.length > 1 && (
                <div className="hot-collections-controls">
                  <button type="button" aria-label="Previous collection" onClick={() => slider.current?.prev()}>&#8249;</button>
                  <button type="button" aria-label="Next collection" onClick={() => slider.current?.next()}>&#8250;</button>
                </div>
              )}
              </div>
              {collections.length > 1 && (
                <p className="hot-collections-position" aria-live="polite">
                  {currentSlide + 1} / {collections.length}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
