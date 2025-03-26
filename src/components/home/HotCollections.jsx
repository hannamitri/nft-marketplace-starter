import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        // Simulate delay
        setTimeout(() => {
          setData(response.data);
          setLoading(false);
        }, 2000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  if (loading) {
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
            <div className="col-lg-12">
              <Slider {...settings}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="nft_coll_wrapper" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton height={150} width="100%" />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton circle height={50} width={50} />
                      </div>
                      <div className="nft_coll_info">
                        <h4>
                          <Skeleton width="60%" />
                        </h4>
                        <span>
                          <Skeleton width="40%" />
                        </span>
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
  }

  if (error) {
    return <p>Error: {error}</p>;
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
          <div className="col-lg-12">
            <Slider {...settings}>
              {data.map((collection) => (
                <div className="nft_coll_wrapper" key={collection.id}>
                  <div className="nft_coll_hot">
                    <div className="nft_wrap">
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
                        alt={collection.name}
                      />
                    </div>
                    <div className="nft_coll_pp">
                      <img
                        className="lazy pp-coll"
                        src={collection.authorImage}
                        alt={collection.author}
                      />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <h4>{collection.title}</h4>
                      <span>{collection.code}</span>
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