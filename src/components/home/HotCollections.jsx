import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import prevArrow from "../../images/chevron-left-solid.svg";
import nextArrow from "../../images/chevron-right-solid.svg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  function SampleNextArrow(props) {
    const { arrow__custom, style, onClick } = props;
    return (
      <div
        id="arrows__custom"
        className={arrow__custom}
        style={{
          ...style,
          display: "block",
          background: "white",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          lineHeight: "40px",
          textAlign: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          cursor: "pointer",
          position: "absolute",
          top: "50%",
          right: "-5px",
          transform: "translateY(-50%)",
          zIndex: 1,
          border: "1px solid lightgray",
          transition: "all ease .5s",
          ":hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 8px rgba(0,0,0,0.1)",
          },
        }}
        onClick={onClick}
      >
        <img
          src={nextArrow}
          style={{
            width: "25px",
            height: "10px",
            lineHeight: "25px",
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            left: "6.8px",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { arrow__custom, style, onClick } = props;
    return (
      <div
        className={arrow__custom}
        style={{
          ...style,
          display: "block",
          background: "white",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          lineHeight: "40px",
          textAlign: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          cursor: "pointer",
          position: "absolute",
          top: "50%",
          left: "-5px",
          transform: "translateY(-50%)",
          zIndex: 1,
          border: "1px solid lightgray",
          transition: "all ease .5s",
          ":hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 8px rgba(0,0,0,0.1)",
          },
        }}
        onClick={onClick}
      >
        <img
          src={prevArrow}
          style={{
            width: "25px",
            height: "10px",
            lineHeight: "25px",
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            left: "6.8px",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  async function fetchCollections() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      );
      console.log(data);
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchCollections();
  }, []);

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
          {loading ? (
            <h1>
              <Slider {...settings}>
                {new Array(4).fill(0).map((_, index) => (
                  <div className="skeleton__loading" key={index}>
                    <div className="nft_coll--loader">
                      <div className="nft_wrap--loader"></div>
                      <div className="nft_coll_pp--loader">
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_title--loader"></div>
                      <div className="nft_coll_code--loader"></div>
                    </div>
                  </div>
                ))}
              </Slider>
            </h1>
          ) : (
            <Slider {...settings}>
              {collections.map((collection) => (
                <div className="col-xs-12" key={collection.id}>
                  <div className="nft_coll">
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
      </div>
    </section>
  );
};

export default HotCollections;
