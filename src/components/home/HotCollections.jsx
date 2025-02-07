import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/customs/hot-collections.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow`}
      style={{
        ...style,
        zIndex: 1,
        display: "flex",
        border: "1px solid #CDCDCD",
        backgroundColor: "white",
        borderRadius: "50px",
        width: "45px",
        height: "45px",
        justifyContent: "center",
        alignItems: "center",
        right: "-5px",
        transition: "all 0.3s ease",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow`}
      style={{
        ...style,
        zIndex: 1,
        display: "flex",
        border: "1px solid #CDCDCD",
        backgroundColor: "white",
        borderRadius: "50px",
        width: "45px",
        height: "45px",
        justifyContent: "center",
        alignItems: "center",
        left: "-4px",
        transition: "all 0.3s ease",
      }}
      onClick={onClick}
    />
  );
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((response) => {
        setCollections(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const settings = {
    // dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
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
            <Slider {...settings}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="slider_box" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <div className="lazy img-fluid">
                        <Skeleton width={"100%"} height={200} />
                      </div>
                    </div>
                    <div className="nft_coll_pp">
                      <div className="lazy pp-coll">
                        <Skeleton circle={true} height={50} width={50} />
                      </div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <h4>
                        <Skeleton width={100} height={20} />
                      </h4>
                      <span>
                        <Skeleton width={60} height={20} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {collections.map((collection, index) => (
                <div className="slider_box" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={collection.nftImage || nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage || AuthorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
