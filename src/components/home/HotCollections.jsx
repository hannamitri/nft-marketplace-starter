import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";
import { SampleNextArrow, SamplePrevArrow } from "../UI/Arrows";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCollections() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setCollections(data);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  useEffect(() => {
    fetchCollections();
  }, []);

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
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div data-aos="fade-up" className="container">
        <div className="text-center mb-4">
          <h2 >Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>
        {isLoading ? (
          <div className="row">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4"
                key={index}
              >
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "20px",
                    borderRadius: "8px",
                    height: "100%",
                  }}
                >
                  <Skeleton height="300px" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Slider {...settings}>
            {collections.map((collection, index) => (
              <div key={index}>
                <div className="nft_coll mx-2">
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
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default HotCollections;
