import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";
import Skeleton from "../UI/Skeleton";
import "../../css/styles/KeenCarousel.css";

const HotCollections = () => {
  const [collections, setCollections] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const sliderRef = React.useRef(null);
  const [slider, setSlider] = React.useState(null);

  React.useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  React.useEffect(() => {
    if (sliderRef.current && collections.length > 0 && !loading) {
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
  }, [collections, loading]);

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
                        <div className="nft_coll collection-skeleton">
                          <div className="nft_wrap">
                            <Skeleton
                              width="100%"
                              height="250px"
                              borderRadius="8px"
                            />
                          </div>
                          <div className="nft_coll_pp">
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          </div>
                          <div className="nft_coll_info">
                            <Skeleton
                              width="80%"
                              height="20px"
                              borderRadius="4px"
                            />
                            <br />
                            <Skeleton
                              width="60%"
                              height="16px"
                              borderRadius="4px"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  : collections.map((collection) => (
                      <div className="keen-slider__slide" key={collection.id}>
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Link to={`/item-details/${collection.nftId}`}>
                              <img
                                src={collection.nftImage || nftImage}
                                className="lazy img-fluid"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="nft_coll_pp">
                            <Link to={`/author/${collection.authorId}`}>
                              <img
                                className="lazy pp-coll"
                                src={collection.authorImage || AuthorImage}
                                alt=""
                              />
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info">
                            <Link to={`/explore/${collection.id}`}>
                              <h4>{collection.title || "Collection Name"}</h4>
                            </Link>
                            <span>
                              {"ERC-"}
                              {collection.code || "ERC-192"}
                            </span>
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

export default HotCollections;
