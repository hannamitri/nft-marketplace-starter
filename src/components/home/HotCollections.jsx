import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./HotCollections.css";
import Arrows, { NextArrow, PrevArrow } from "./Arrows";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HotCollections = () => {
  const sliderRef = useRef(null);
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
    arrows: true,
    nextArrow: <NextArrow sliderRef={sliderRef} />,
    prevArrow: <PrevArrow sliderRef={sliderRef} />,
  };

  const [collections, setCollections] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    async function fetchCollections() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      );
      setCollections(data);
  
    }
    fetchCollections();
    
  }, []);

  const imageLoaded = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    if (
      Object.keys(loadedImages).length === collections.length &&
      collections.length > 0
    ) {
      setAllLoaded(true);
    }
  }, [loadedImages, collections.length]);

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
          <Slider {...settings} ref={sliderRef}>
            {collections.map((item) => (
              <div key={item.id}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      {!allLoaded && <Skeleton height={200} />}
                      <img
                        src={item.nftImage}
                        className="lazy img-fluid"
                        alt={item.title}
                        style={{ display: allLoaded ? "block" : "none" }}
                        onLoad={() => imageLoaded(item.id)}
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${item.authorId}`}>
                      {!allLoaded && <Skeleton circle={true} height={50} width={50} />}
                      <img
                        className="lazy pp-coll"
                        src={item.authorImage}
                        alt={item.creator}
                        style={{ display: allLoaded ? "block" : "none" }}
                        onLoad={() => imageLoaded(item.id)}
                      />
                    </Link>         
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      {!allLoaded ? (
                        <Skeleton width={100} height={20} />
                      ) : ( 
                        <h4>{item.title}</h4>
                      )}
                    </Link>
                    <span>ERC-{item.code}</span>
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
