import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../../css/HotCollections.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((response) => {
        if (isMounted.current) {
          setData(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted.current) {
          setError(error);
          setLoading(false);
        }
      });
    return () => {
      isMounted.current = false;
    };
  }, []);
  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div data-aos="fade-in" className="row">
            <div className="col-lg-12 text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
            <div className="col-12 slider__container">
              <Slider {...settings}>
                {[...Array(6)].map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton
                          width="100%"
                          height="200px"
                          borderRadius="8px"
                        />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton
                          width="40px"
                          height="40px"
                          borderRadius="50%"
                        />
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton
                          width="80%"
                          height="20px"
                          borderRadius="4px"
                        />
                        <Skeleton
                          width="60%"
                          height="16px"
                          borderRadius="4px"
                        />
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
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div data-aos="fade-in" className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-12">
              {data && (
                <div className="slider__container">
                  <Slider {...settings}>
                    {data.slice(0, 6).map((item, index) => (
                      <div key={index}>
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Link to={`/item-details/${item.nftId || ""}`}>
                              <img
                                src={item.nftImage || nftImage}
                                className="lazy img-fluid"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="nft_coll_pp">
                            <Link to={`/author/${item.authorId || ""}`}>
                              <img
                                className="lazy pp-coll"
                                src={item.authorImage || AuthorImage}
                                alt=""
                              />
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info">
                            <Link to={`/explore/${item.collectionId || ""}`}>
                              <h4>{item.code || "No Title"}</h4>
                            </Link>
                            <span>{item.code || "No Code"}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HotCollections;
