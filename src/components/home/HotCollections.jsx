import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/src/owl.carousel.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(data);
    setLoaded(true);
    console.log(data);
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const carouselOptions = {
    items: 4,
    nav: true,
    dots: true,
    loop: true,
    margin: 0,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
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
            <OwlCarousel options={carouselOptions}>

            {/* <Slider {...settings}> */}
            {loaded
              ? hotCollections.map((hotCollection) => (
                  <div
                    // className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                     className="mr-4"
                    key={hotCollection.id}
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={hotCollection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={hotCollection.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{hotCollection.title}</h4>
                        </Link>
                        <span>ERC-{hotCollection.code}</span>
                      </div>
                    </div>
                  </div>
                ))
              : hotCollections.map((hotCollection) => (
                  <div
                    // className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={hotCollection.id}
                  >
                    <div className="nft_coll">
                      <Skeleton
                        width="100%"
                        height="200px"
                        borderRadius="8px"
                      />
                      <div className="nft_coll_pp">
                        <Skeleton
                          width="40px"
                          height="40px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton
                          width="70%"
                          height="24px"
                          borderRadius="4px"
                        />
                        <Skeleton
                          width="40%"
                          height="18px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                  </div>
                ))}
          {/* </Slider> */}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
