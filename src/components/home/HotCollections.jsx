import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function getHotCollections() {
      try {
        setHasError(false);
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Failed to load hot collections:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getHotCollections();
  }, []);

  const visibleCollections =
    isLoading || hasError ? new Array(6).fill(null) : collections;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section id="section-collections" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center" data-aos="fade-up">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <Slider {...settings}>
              {visibleCollections.map((collection, index) => (
                <div key={collection?.id || index} className="px-2" data-aos="fade-up">
                  <div className="nft_coll" data-aos="fade-up">
                    <div className="nft_wrap">
                      {collection ? (
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt={collection.title}
                          />
                        </Link>
                      ) : (
                        <Skeleton width="100%" height="100%" />
                      )}
                    </div>
                    <div className="nft_coll_pp">
                      {collection ? (
                        <>
                          <Link to={`/author/${collection.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={collection.authorImage}
                              alt={collection.title}
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </>
                      ) : (
                        <Skeleton
                          width="60px"
                          height="60px"
                          borderRadius="50%"
                        />
                      )}
                    </div>
                    <div className="nft_coll_info">
                      {collection ? (
                        <>
                          <Link to={`/item-details/${collection.nftId}`}>
                            <h4>{collection.title}</h4>
                          </Link>
                          <span>ERC-{collection.code}</span>
                        </>
                      ) : (
                        <>
                          <Skeleton
                            width="45%"
                            height="18px"
                            borderRadius="4px"
                          />
                          <br />
                          <Skeleton
                            width="28%"
                            height="14px"
                            borderRadius="4px"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
