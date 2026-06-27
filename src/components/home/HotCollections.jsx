import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import useMinimumLoading from "../UI/useMinimumLoading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = ({ className, onClick }) => {
  return (
    <button
      type="button"
      className={`${className} hot-collections-arrow hot-collections-arrow-prev`}
      onClick={onClick}
      aria-label="Previous hot collections"
    >
      <i className="fa fa-angle-left" aria-hidden="true"></i>
    </button>
  );
};

const NextArrow = ({ className, onClick }) => {
  return (
    <button
      type="button"
      className={`${className} hot-collections-arrow hot-collections-arrow-next`}
      onClick={onClick}
      aria-label="Next hot collections"
    >
      <i className="fa fa-angle-right" aria-hidden="true"></i>
    </button>
  );
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const displayLoading = useMinimumLoading(loading, 700);

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
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
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    async function fetchCollections() {
      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      const data = await response.json();
      setCollections(data);
      setLoading(false);
    }
    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="100">
            <Slider {...sliderSettings}>
              {displayLoading
                ? new Array(4).fill(0).map((_, index) => (
                    <div key={index} style={{ padding: "0 12px" }}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width="100%" height="200px" borderRadius="8px" />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        </div>
                        <div className="nft_coll_info" style={{ paddingTop: "56px" }}>
                          <Skeleton width="80%" height="20px" borderRadius="4px" />
                          <Skeleton width="40%" height="15px" borderRadius="4px" />
                        </div>
                      </div>
                    </div>
                  ))
                : collections.map((collection) => (
                    <div key={collection.id} style={{ padding: "0 12px" }}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${collection.nftId}`}>
                            <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${collection.authorId}`}>
                            <img className="lazy pp-coll" src={collection.authorImage} alt="" />
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
