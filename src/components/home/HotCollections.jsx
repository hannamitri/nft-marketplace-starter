import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles-slick.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Hide loading state
      }
    };
    fetchData();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const goToNext = () => sliderRef.current.slickNext();
  const goToPrev = () => sliderRef.current.slickPrev();

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="col-lg-12">
            {loading ? (
              <Slider {...settings}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="slider-item" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton height={200} width="100%" />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton circle={true} height={50} width={50} />
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton width="60%" height={20} />
                        <Skeleton width="40%" height={15} />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...settings} ref={sliderRef}>
                {collections.map((collection, index) => (
                  <div className="slider-item" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ETC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}

            <div className="slider-controls">
              <button onClick={goToPrev} className="btn-prev">&lt;</button>
              <button onClick={goToNext} className="btn-next">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
