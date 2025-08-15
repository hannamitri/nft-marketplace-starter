import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const HotCollections = () => {
  const [nftInfo, setNftInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      mode: "free-snap",
      slides: {
        perView: 4,
        spacing: 15,
      },
      breakpoints: {
        "(max-width: 1200px)": {
          slides: { perView: 3, spacing: 12 },
        },
        "(max-width: 900px)": {
          slides: { perView: 2, spacing: 10 },
        },
        "(max-width: 600px)": {
          slides: { perView: 1, spacing: 8 },
        },
      },
      slideChanged() {
        console.log("slide changed");
      },
    },
    [
      // add plugins here
    ]
  );

  async function getHotCollectionData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setLoading(false);
    setNftInfo(data);
    console.log( "HotCollData", data);
  }

  function renderLoadingState() {
    return (
      <div ref={sliderRef} className="keen-slider">
        {new Array(4).fill(0).map((_, id) => (
          <div className="keen-slider__slide" key={id}>
            <div className="nft_coll nft_coll--skeleton">
              <div className="nft_wrap">
                <div className="nft-item__img--skeleton skeleton-box"></div>
              </div>
              <div className="nft_coll_pp">
                <div className="nft__pp--skeleton skeleton-box"></div>
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info info">
                <div className="nft__title--skeleton skeleton-box"></div>
                <span>
                  <div className="nft__code--skeleton skeleton-box"></div>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  useEffect(() => {
    getHotCollectionData();
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
          <div className="keen-slider__container">
            <button
              className="keen-slider-arrow keen-slider-arrow--left"
              onClick={() => instanceRef.current && instanceRef.current.prev()}
            >
              <IoIosArrowBack />
            </button>
            {!loading ? (
              <>
                <div ref={sliderRef} className="keen-slider">
                  {nftInfo.map((nft, id) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                      key={id}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img
                              src={nft.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={nft.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{nft.title}</h4>
                          </Link>
                          <span>
                            ERC-<span>{nft.code}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              renderLoadingState()
            )}
            <button
              className="keen-slider-arrow keen-slider-arrow--right"
              onClick={() => instanceRef.current && instanceRef.current.next()}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
