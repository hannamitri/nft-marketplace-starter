import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState();

  async function fetchHotCollections() {
    setLoadingSkeleton(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(data);
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 250);
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  // Carousel Settings for Hot Collections
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          borderRadius: "100%",
          transform: "scale(2)",
          opacity: 0.6,
          marginRight: "16px",
          zIndex: "999",
        }}
        onClick={onClick}
      ></div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          borderRadius: "100%",
          transform: "scale(2 )",
          opacity: 0.6,
          marginLeft: "16px",
          zIndex: "999",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row ">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {hotCollections.map((collections) => (
              <div
                className="lazy col-lg-12 col-md-12 col-sm-12 col-xs-12"
                key={collections.id}
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      {loadingSkeleton ? (
                        <Skeleton width={"100%"} height={"120px"} />
                      ) : (
                        <img
                          src={collections.nftImage}
                          className="lazy img-fluid h-100"
                          alt=""
                        />
                      )}
                    </Link>
                  </div>
                  <div className="nft_coll_pp ">
                    {loadingSkeleton ? (
                      <Skeleton
                        width={"50px"}
                        height={"45px"}
                        borderRadius={"50%"}
                      />
                    ) : (
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collections.authorImage}
                          alt=""
                        />
                      </Link>
                    )}
                    {loadingSkeleton ? (
                      <Skeleton />
                    ) : (
                      <i className="fa fa-check"></i>
                    )}
                  </div>
                  <div className="nft_coll_info d-flex flex-column align-items-center">
                    <Link to="/explore">
                      {loadingSkeleton ? (
                        <Skeleton width={"80px"} height={"15px"} />
                      ) : (
                        <h4>{collections.title}</h4>
                      )}
                    </Link>
                    {loadingSkeleton ? (
                      <Skeleton width={"50px"} height={"15px"} />
                    ) : (
                      <span>ERC-{collections.code}</span>
                    )}
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
