import React from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useHotCollections } from "../../hooks/useHotCollections";

const HotCollections = () => {
  const { collections, loading, error } = useHotCollections();

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 4, spacing: 15 },
    breakpoints: {
      "(max-width: 1023px)": { slides: { perView: 3, spacing: 15 } },
      "(max-width: 767px)":  { slides: { perView: 2, spacing: 10 } },
      "(max-width: 639px)":  { slides: { perView: 1, spacing: 10 } },
    },
  });

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
            {new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
                  </div>
                  <div className="nft__item_wrap">
                    <div style={{ width: "100%", height: "200px", borderRadius: "8px", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
                  </div>
                  <div className="nft__item_info">
                    <div style={{ width: "120px", height: "16px", borderRadius: "4px", marginBottom: "8px", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
                    <div style={{ width: "80px", height: "14px", borderRadius: "4px", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center" style={{ padding: "60px 0" }}>
              <p>Error: {error}</p>
              <button className="btn-main" onClick={() => window.location.reload()}>Retry</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (collections.length === 0) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center" style={{ padding: "60px 0" }}>
              <p>No collections available.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
        </div>

        <div className="col-lg-12" style={{ position: "relative" }} data-aos="fade-up" data-aos-delay="100">

          {/* Left Arrow */}
          <button
            onClick={() => instanceRef.current?.prev()}
            style={{ position: "absolute", left: "-25px", top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "none", border: "none", cursor: "pointer", fontSize: "24px", color: "#333" }}
            aria-label="Previous slide"
          >
            <i className="fa fa-angle-left"></i>
          </button>

          {/* Keen Slider Track */}
          <div ref={sliderRef} className="keen-slider">
            {collections.map((collection) => (
              <div className="keen-slider__slide" key={collection.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${collection.authorId}`}>
                      <img className="lazy" src={collection.authorImage} alt={collection.authorName} />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer"><i className="fa fa-facebook fa-lg"></i></a>
                          <a href="" target="_blank" rel="noreferrer"><i className="fa fa-twitter fa-lg"></i></a>
                          <a href=""><i className="fa fa-envelope fa-lg"></i></a>
                        </div>
                      </div>
                    </div>
                    <Link to={`/item-details/${collection.nftId}`}>
                      <img src={collection.nftImage} className="lazy nft__item_preview" alt={collection.title} />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${collection.nftId}`}>
                      <h4>{collection.title}</h4>
                    </Link>
                    <div className="nft__item_price">ERC-{collection.code}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => instanceRef.current?.next()}
            style={{ position: "absolute", right: "-25px", top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "none", border: "none", cursor: "pointer", fontSize: "24px", color: "#333" }}
            aria-label="Next slide"
          >
            <i className="fa fa-angle-right"></i>
          </button>

        </div>
      </div>
    </section>
  );
};

export default HotCollections;