import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/slick-arrows.css";

const HotCollections = () => {
  const [colls, setColls] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    setTimeout(async () => {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setColls(data);
      setLoading(false);
    }, 1000);
  }

  function MultipleItems() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

    return (
      <Slider ref={sliderRef} {...settings}>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="slider-container">
                <div className="nft_coll--wrapper">
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton className="lazy img-fluid" height={300} />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton
                        className="lazy pp-coll"
                        height={50}
                        width={50}
                      />
                      <Skeleton
                        className="lazy check-mark"
                        height={20}
                        width={20}
                      />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton height={20} width={100} />
                      <Skeleton height={20} width={50} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          : colls.map(({ id, nftImage, authorId, authorImage, title, code }) => (
              <div key={id} className="nft_coll--wrapper">
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${id}`}>
                      <img
                        src={nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to={`/item-details/${id}`}>
                      <h4>{title}</h4>
                    </Link>
                    <span>ERC-{code}</span>
                  </div>
                </div>
              </div>
            ))}
      </Slider>
    );
  }

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
            {MultipleItems()}
            {loading ? (
              <>
                <Skeleton className="slick-prev" width={40} height={40} circle />
                <Skeleton className="slick-next" width={40} height={40} circle />
              </>
            ) : (
              <>
                  <button
                    className="slick-prev"
                    onClick={() => sliderRef.current.slickPrev()}
                  >
                    <i className="fa fa-chevron-left"></i>
                  </button>
                  <button
                    className="slick-next"
                    onClick={() => sliderRef.current.slickNext()}
                  >
                    <i className="fa fa-chevron-right"></i>
                  </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
