import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SkeletonPP from "../../images/hot-collection-skeleton--pp.png";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const settings = {
    dots: false,

    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  function SampleNextArrow({ onClick }) {
    return (
      <div className="hot-collections__arrow-next" onClick={onClick}>
        <HiChevronRight />
      </div>
    );
  }

  function SamplePrevArrow({ onClick }) {
    return (
      <div className="hot-collections__arrow-prev" onClick={onClick}>
        <HiChevronLeft />
      </div>
    );
  }

  const getHotCollectionInfo = async () => {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getHotCollectionInfo();
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
          <div className="slider-container">
            <Slider {...settings}>
              {!isLoading
                ? hotCollections.map((collection, index) => (
                    <div className="nft_coll m-10" key={index}>
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
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
                  ))
                : new Array(4).fill(0).map((_, index) => (
                    <div key={index} className="nft_coll">
                      <div className="nft_wrap hot--collection__skeleton"></div>
                      <div className="nft_coll_pp">
                        <img className="lazy pp-coll" src={SkeletonPP} alt="" />

                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info ">
                        <h4 className="nft-name__skeleton"></h4>

                        <h3 className="nft-code__skeleton"></h3>
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
