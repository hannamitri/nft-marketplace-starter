import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchHotCollections() {
    setLoading(true);
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(response.data);
    console.log(response)
    setLoading(false);
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          infinite: true,
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
          <Slider {...settings}>
            {loading ? (
              <div className="p-2">
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton width={282} height={270} />
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
            ) : (
              hotCollections.map((collections, index) => (
                <div className="p-2" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collections.nftId}`}>
                        <img
                          src={collections.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collections.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collections.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collections.title}</h4>
                      </Link>
                      <span>ERC-{collections.code}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
