import React from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { useKeenSlider } from "keen-slider/react";

const HotCollections = () => {
  const {
    data: collections = [],
    isLoading,
  } = useSWR(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
  );
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      breakpoints: {
        "(min-width: 450px)": {
          slides: { perView: 2 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 3 },
        },
        "(min-width: 1200px)": {
          slides: { perView: 4 },
        },
      },
      slides: { perView: 1 },
    },
    [
      // add plugins here
    ]
  );
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row row--collections">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading && (
            <div ref={sliderRef} className="keen-slider">
              {Array(4)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    style={{ height: "317px" }}
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                  >
                    <div style={{ height: "100%" }} className="nft_coll">
                      <div
                        style={{ height: "170px" }}
                        className="skeleton-box nft_wrap"
                      ></div>
                      <div className="nft_coll_pp">
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            background: "#ddd",
                            border: "none",
                            borderRadius: "50%",
                          }}
                          className="skeleton-box pp-coll"
                          alt=""
                        ></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <div
                          style={{ width: "140px" }}
                          className="skeleton-box"
                        ></div>
                        <br />
                        <div
                          style={{ width: "80px" }}
                          className="skeleton-box"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {!isLoading && (
            <div ref={sliderRef} className="keen-slider">
              {collections.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                  key={item.id}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={"/item-details/"+item.nftId}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={"/author/"+item.authorId}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            className="slider-btn slider-btn--prev"
            onClick={() => instanceRef.current?.prev()}
          >
            <i className="fa fa-chevron-left"></i>
          </button>
          <button
            className="slider-btn slider-btn--next"
            onClick={() => instanceRef.current?.next()}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
