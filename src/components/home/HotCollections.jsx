import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },
      "(max-width: 480px)": {
        slides: {
          perView: 1,
          spacing: 8,
        },
      },
    },
  });

  useEffect(() => {
    instanceRef.current?.update();
  }, [collections, instanceRef]);

  const skeletonStyle = {
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s ease infinite",
    borderRadius: "8px",
  };

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections/"
      )
      .then((res) => {
        setCollections(res.data.slice(0, 6));
        setIsLoading(false);
      });
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
          <div style={{ position: "relative" }}>
            <button
              onClick={() => instanceRef.current?.prev()}
              className="arrow arrow-left"
              style={{ position: "absolute", left: "-20px", top: "50%", transform: "translateY(-50%)", zIndex: 1 }}
            >
              <i className="fa fa-angle-left"></i>
            </button>

            <div ref={sliderRef} className="keen-slider" key={isLoading ? "loading" : "loaded"}>
              {isLoading
                ? Array.from({ length: 4 }, (_, index) => (
                    <div
                      className="keen-slider__slide"
                      key={index}
                    >
                      <div className="nft_coll">
                        <div style={{ ...skeletonStyle, height: "122px" }} />
                        <div style={{ ...skeletonStyle, height: "40px", width: "40px", borderRadius: "50%", margin: "8px auto" }} />
                        <div style={{ ...skeletonStyle, height: "16px", width: "60%", margin: "8px auto" }} />
                      </div>
                    </div>
                  ))
                : collections.map((item) => (
                    <div
                      className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={item.id}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img
                              src={item.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={item.AuthorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{item.title}</h4>
                          </Link>
                          <span>{item.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            <button
              onClick={() => instanceRef.current?.next()}
              className="arrow arrow-right"
              style={{ position: "absolute", right: "-20px", top: "50%", transform: "translateY(-50%)", zIndex: 1 }}
            >
              <i className="fa fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
