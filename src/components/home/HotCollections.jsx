import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "../../css/styles/HotCollections.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
  let isMounted = true;

  async function fetchCollections() {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );

      if (isMounted) {
        setCollections(response.data);
      }
    } catch (error) {
      console.error(
        "Unable to fetch hot collections:",
        error
      );
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  }

  fetchCollections();

  return () => {
    isMounted = false;
  };
}, []);

  const skeletonCards = new Array(4).fill(0);

  return (
    <section
      id="section-collections"
      className="hot-collections-section"
    >
      <div className="hot-collections-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <div className="hot-collections-slider">
          <Slider {...settings}>
            {loading
              ? skeletonCards.map((_, index) => (
                  <div key={index}>
                    <div className="collection-card">
                      <div className="nft_coll hot-collection-skeleton">
                        <div className="nft_wrap">
                          <div className="hot-collection-image-skeleton skeleton-shimmer"></div>
                        </div>

                        <div className="nft_coll_pp">
                          <div className="hot-collection-avatar-skeleton skeleton-shimmer"></div>
                        </div>

                        <div className="nft_coll_info">
                          <div className="hot-collection-title-skeleton skeleton-shimmer"></div>

                          <div className="hot-collection-code-skeleton skeleton-shimmer"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : collections
                  .slice(0, 6)
                  .map((collection) => (
                    <div key={collection.id}>
                      <div className="collection-card">
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Link
                              to={`/item-details/${collection.id}`}
                            >
                              <h4>
                                {collection.title}
                              </h4>

                              <img
                                src={
                                  collection.nftImage
                                }
                                className="lazy img-fluid"
                                alt={collection.title}
                              />
                            </Link>
                          </div>

                          <div className="nft_coll_pp">
                            <Link to={`/author/${collection.authorId}`}>
                              <img
                                className="lazy pp-coll"
                                src={
                                  collection.authorImage
                                }
                                alt={
                                  collection.title
                                }
                              />
                            </Link>

                            <i className="fa fa-check"></i>
                          </div>

                          <div className="nft_coll_info">
                            <Link to="/explore">
                              <h4>
                                {collection.title}
                              </h4>
                            </Link>

                            <span>
                              ERC-{collection.code}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;