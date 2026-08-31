import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const data = await response.json();

        setCollections(Array.isArray(data) ? data : []);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const renderCard = (item, index) => {
    const itemId = item.nftId || item.id;

    return (
      <div key={itemId || index}>
        <div className="nft_coll">
          <div className="nft_wrap">
            {itemId ? (
              <Link to={`/item-details/${itemId}`}>
                <img
                  src={item.nftImage}
                  className="lazy img-fluid"
                  alt={item.title}
                />
              </Link>
            ) : (
              <img
                src={item.nftImage}
                className="lazy img-fluid"
                alt={item.title}
              />
            )}
          </div>

          <div className="nft_coll_pp">
            {item.authorId ? (
              <Link to={`/author/${item.authorId}`}>
                <img
                  className="lazy pp-coll"
                  src={item.authorImage}
                  alt={item.title}
                />
              </Link>
            ) : (
              <img
                className="lazy pp-coll"
                src={item.authorImage}
                alt={item.title}
              />
            )}
            <i className="fa fa-check"></i>
          </div>

          <div className="nft_coll_info">
            {itemId ? (
              <Link to={`/item-details/${itemId}`}>
                <h4>{item.title}</h4>
              </Link>
            ) : (
              <h4>{item.title}</h4>
            )}
            <span>ERC-{item.code}</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="row">
            {new Array(4).fill(0).map((_, i) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
                <Skeleton />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>

        <Slider {...settings} key={slidesToShow}>
          {collections.map(renderCard)}
        </Slider>
      </div>
    </section>
  );
};

export default HotCollections;