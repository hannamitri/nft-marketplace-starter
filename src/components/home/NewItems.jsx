import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";
import Skeleton from "../UI/Skeleton";
import CountdownTimer from "../UI/CountdownTimer";
import "../../css/styles/KeenCarousel.css";

const NewItems = () => {
  const [nftData, setNftData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const sliderRef = React.useRef(null);
  const [slider, setSlider] = React.useState(null);

  React.useEffect(() => {
    const fetchNftData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNftData(response.data);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNftData();
  }, []);

  React.useEffect(() => {
    if (sliderRef.current && nftData.length > 0 && !loading) {
      const keenSlider = new KeenSlider(sliderRef.current, {
        loop: true,
        mode: "free",
        slides: {
          perView: 4,
          spacing: 15,
        },
        breakpoints: {
          "(max-width: 1200px)": {
            slides: { perView: 3, spacing: 15 },
          },
          "(max-width: 992px)": {
            slides: { perView: 2, spacing: 15 },
          },
          "(max-width: 768px)": {
            slides: { perView: 2, spacing: 12 },
          },
          "(max-width: 500px)": {
            slides: { perView: 1, spacing: 10 },
          },
        },
      });
      setSlider(keenSlider);

      return () => {
        keenSlider.destroy();
      };
    }
  }, [nftData, loading]);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="slider-container">
              <div ref={sliderRef} className="keen-slider">
                {loading
                  ? // Skeleton Loading state
                    Array.from({ length: 4 }).map((_, index) => (
                      <div
                        className="keen-slider__slide"
                        key={`skeleton-${index}`}
                      >
                        <div className="nft__item">
                          <div className="author_list_pp">
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          </div>
                          <div className="de_countdown">
                            <Skeleton
                              width="100px"
                              height="20px"
                              borderRadius="4px"
                            />
                          </div>
                          <div className="nft__item_wrap">
                            <Skeleton
                              width="100%"
                              height="250px"
                              borderRadius="8px"
                            />
                          </div>
                          <div className="nft__item_info">
                            <Skeleton
                              width="80%"
                              height="24px"
                              borderRadius="4px"
                            />
                            <br />
                            <Skeleton
                              width="60%"
                              height="20px"
                              borderRadius="4px"
                            />
                            <br />
                            <Skeleton
                              width="40%"
                              height="16px"
                              borderRadius="4px"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  : nftData.map((item) => (
                      <div className="keen-slider__slide" key={item.id}>
                        <div className="nft__item">
                          <div className="author_list_pp">
                            <Link
                              to={`/author/${item.authorId}`}
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title={`Creator: ${item.authorName}`}
                            >
                              <img 
                                className="lazy" 
                                src={item.authorImage || AuthorImage} 
                                alt="" 
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          {item.expiryDate && (
                            <div className="de_countdown">
                              <CountdownTimer expiryDate={item.expiryDate} />
                            </div>
                          )}

                          <div className="nft__item_wrap">
                            <div className="nft__item_extra">
                              <div className="nft__item_buttons">
                                <button>Buy Now</button>
                                <div className="nft__item_share">
                                  <h4>Share</h4>
                                  {/* eslint-disable-next-line */}
                                  <a href="#" target="_blank" rel="noreferrer">
                                    <i className="fa fa-facebook fa-lg"></i>
                                  </a>
                                  {/* eslint-disable-next-line */}
                                  <a href="#" target="_blank" rel="noreferrer">
                                    <i className="fa fa-twitter fa-lg"></i>
                                  </a>
                                  {/* eslint-disable-next-line */}
                                  <a href="#">
                                    <i className="fa fa-envelope fa-lg"></i>
                                  </a>
                                </div>
                              </div>
                            </div>

                            <Link to={`/item-details/${item.nftId}`}>
                              <img
                                src={item.nftImage || nftImage}
                                className="lazy nft__item_preview"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="nft__item_info">
                            <Link to={`/item-details/${item.nftId}`}>
                              <h4>{item.title || "Unnamed NFT"}</h4>
                            </Link>
                            <div className="nft__item_price">
                              {item.price || "0.00"} ETH
                            </div>
                            <div className="nft__item_like">
                              <i className="fa fa-heart"></i>
                              <span>{item.likes || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>

              {/* Navigation Arrows - only show when not loading */}
              {slider && !loading && (
                <>
                  <button
                    className="slider-arrow slider-arrow--left"
                    onClick={() => slider.prev()}
                  >
                    ‹
                  </button>
                  <button
                    className="slider-arrow slider-arrow--right"
                    onClick={() => slider.next()}
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
