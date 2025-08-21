import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const HotCollections = () => {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(max-width: 1200px)": {
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
      "(max-width: 780px)": {
        slides: {
          perView: 2,
          spacing: 6,
        },
      },
      "(max-width: 540px)": {
        slides: {
          perView: 1,
          spacing: 0,
        },
      },
    },
    slides: {
      perView: 4,
      spacing: 10,
    },
  });

  const getPerView = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1920;
    if (w <= 540) return 1;
    if (w <= 780) return 2;
    if (w <= 1200) return 3;
    return 4;
  };
  const [perView, setPerView] = useState(getPerView());

  async function getCards() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCards(data);
    setLoading(false);
  }

  useEffect(() => {
    const onResize = () => setPerView(getPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    getCards();
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
          {loading ? (
            <div className="navigation-wrapper">
              <div className="keen-slider">
                {Array.from({ length: perView }).map((_, i) => (
                  <div className="keen-slider__slide" key={`skel-${i}`}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div
                          className="skeleton-box"
                          style={{ width: "100%", height: "200px" }}
                        ></div>
                      </div>
                      <div className="nft_coll--pp">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        ></div>
                      </div>
                      <div className="nft_coll_info">
                        <div
                          className="skeleton-box"
                          style={{ width: "100px", height: "20px" }}
                        ></div>

                        <div
                          className="skeleton-box"
                          style={{ width: "60px", height: "20px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="navigation-wrapper">
              {cards.length > 0 && (
                <div ref={sliderRef} className="keen-slider">
                  {cards.map((card) => (
                    <div className="keen-slider__slide" key={card.id}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img
                              src={card.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>

                        <div className="nft_coll--pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={card.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{card.title}</h4>
                          </Link>

                          <span>ERC-{card.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {
                <>
                  <button
                    className="arrow arrow-left"
                    onClick={() => instanceRef.current.prev()}
                  >
                    {" "}
                    &lt;
                  </button>
                  <button
                    className="arrow arrow-right"
                    onClick={() => instanceRef.current.next()}
                  >
                    {" "}
                    &gt;
                  </button>
                </>
              }
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
