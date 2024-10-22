import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../../css/carousel/Carousel.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const HotCollections = () => {
  const [nfts, setNfts] = useState([]);
  const [img, setImg] = useState(true);

  useEffect(() => {
    async function fetchNFT() {
      setImg(false);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      );
      setNfts(data);
      setImg(true);
    }
    fetchNFT();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 10 },
      },
    },
    slides: { perView: 1 },
    loop: true,
    mode: "free-snap",
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <section
        id="section-collections"
        className="no-bottom"
        data-aos="fade-in"
        data-aos-delay="300"
        data-aos-duration="500"
        data-aos-easing="ease-in"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
              <div className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider">
                  <>
                    {img
                      ? nfts.map((nfts, id) => (
                          <div
                            className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12 "
                            key={nfts.id}
                          >
                            <div className="nft_coll">
                              <div className="nft_wrap">
                                <Link to={`/item-details/${nfts.nftId}`}>
                                  <img
                                    src={nfts.nftImage}
                                    className="lazy img-fluid"
                                    alt=""
                                  />
                                </Link>
                              </div>
                              <div className="nft_coll_pp">
                                <Link to={`/author/${nfts.authorId}`}>
                                  <img
                                    className="lazy pp-coll"
                                    src={nfts.authorImage}
                                    alt=""
                                  />
                                </Link>
                                <i className="fa fa-check"></i>
                              </div>
                              <div className="nft_coll_info">
                                <Link to="/explore">
                                  <h4>{nfts.title}</h4>
                                </Link>
                                <span>ERC-{nfts.code}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      : new Array(4).fill(0).map((_, index) => (
                          <div
                            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                            key={index}
                          >
                            <div className="nft_coll">
                              <div className="nft_wrap__skeleton skeleton-box"></div>
                              <div className="nft_coll_pp__skeleton skeleton-box"></div>
                              <div className="flex-col">
                                <div className="nft_coll_info__skeleton skeleton-box"></div>
                                <br />
                                <div className="nft_coll_info__skeleton2 skeleton-box"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                  </>
                </div>
                {loaded && instanceRef.current && (
                  <>
                    <Arrow
                      left
                      onClick={(e) =>
                        e.stopPropagation() || instanceRef.current?.prev()
                      }
                    />

                    <Arrow
                      onClick={(e) =>
                        e.stopPropagation() || instanceRef.current?.next()
                      }
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function Arrow(props) {
  const disabled = props.disabled ? "arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default HotCollections;
