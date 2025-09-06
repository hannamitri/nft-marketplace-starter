// src/components/home/HotCollections.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "../UI/SkeletonCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(res.data);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <section className="container">
      <div className="text-center">
        <h2>Hot Collections</h2>
        <div className="small-border"></div>
      </div>

      {collections.length === 0 ? (
        <div className="row">
          {new Array(4).fill(0).map((_, i) => (
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={i}>
              <Skeleton />
            </div>
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {collections.map((collection) => (
            <div key={collection.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${collection.nftId}`}>
                    <img
                      src={collection.nftImage}
                      className="lazy img-fluid"
                      alt={collection.title}
                    />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/${collection.authorId}`}>
                    <div className="author_list_pp">
                      <img
                        className="lazy"
                        src={collection.authorImage}
                        alt={collection.author}
                      />
                      <i className="fa fa-check"></i>
                    </div>
                  </Link>
                </div>
                <div className="nft_coll_info">
                  <Link to={`/item-details/${collection.nftId}`}>
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>{collection.code}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
};

export default HotCollections;
