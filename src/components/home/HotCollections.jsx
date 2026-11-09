import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./HotCollections.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const SkeletonSlide = () => (
  <div className="keen-slider__slide">
    <div className="nft_coll hc-skeleton">
      <div className="nft_wrap hc-skeleton__img" />
      <div className="nft_coll_info hc-skeleton__info">
        <span className="hc-skeleton__line" />
        <span className="hc-skeleton__line hc-skeleton__line--short" />
      </div>
    </div>
  </div>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Slides per screen size: mobile shows a peek of the next card so
  // it's obvious the row can be swiped.
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 1.15, spacing: 12 },
    breakpoints: {
      "(min-width: 576px)": { slides: { perView: 2, spacing: 16 } },
      "(min-width: 768px)": { slides: { perView: 3, spacing: 16 } },
      "(min-width: 992px)": { slides: { perView: 4, spacing: 20 } },
    },
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCollections(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  // The slider mounts before data arrives, so tell it to re-measure.
  useEffect(() => {
    instanceRef.current?.update();
  }, [loading, collections, instanceRef]);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        {error ? (
          <p className="text-center hc-error">
            Collections didn’t load. Refresh the page to try again.
          </p>
        ) : (
          <div className="hc-wrap" data-aos="fade-up" data-aos-delay="100">
            <div ref={sliderRef} className="keen-slider">
              {loading
                ? Array.from({ length: 4 }, (_, i) => <SkeletonSlide key={i} />)
                : collections.map((c) => (
                    <div className="keen-slider__slide" key={c.id}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${c.nftId}`}>
                            <img
                              src={c.nftImage}
                              className="img-fluid"
                              alt={c.title}
                              loading="lazy"
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${c.authorId}`}>
                            <img
                              className="pp-coll"
                              src={c.authorImage}
                              alt={`Author of ${c.title}`}
                              loading="lazy"
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{c.title}</h4>
                          </Link>
                          <span>ERC-{c.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {!loading && (
              <>
                <button
                  type="button"
                  className="hc-arrow hc-arrow--prev"
                  aria-label="Previous collections"
                  onClick={() => instanceRef.current?.prev()}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="hc-arrow hc-arrow--next"
                  aria-label="Next collections"
                  onClick={() => instanceRef.current?.next()}
                >
                  ›
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HotCollections;
