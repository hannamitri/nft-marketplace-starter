import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/style.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const API__URL = `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`;

const HotCollections = () => {
  const [nftInfo, setNftInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const skeletonArray = Array(4).fill(null);

  async function hotCollectionsData() {
    try {
      const response = await axios.get(`${API__URL}`);
      setNftInfo(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    hotCollectionsData();
  }, []);


  // Arrow styling for carousel
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex" }}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          arrows: false,
          slidesToScroll: 2,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
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
          <div className="carousel-container">
            {isLoading && (
              <>
                <Slider {...settings}>
                  {skeletonArray.map((_, index) => (
                    <div key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width={500} height={1000} />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton width={50} height={50} borderRadius={99} />
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <h4>
                            <Skeleton height={20} width="40%" />
                          </h4>
                          <span>
                            <Skeleton height={20} width="20%" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </>
            )}

            {!isLoading && (
              <Slider {...settings}>
                {nftInfo.map((nft) => (
                  <div key={nft.id}>
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
                        <span>ERC-{nft.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
