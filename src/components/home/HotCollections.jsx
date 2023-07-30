import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/style.css";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import AOS from "aos";
import "aos/dist/aos.css";



const HotCollections = () => {
  const [posts, nftPost] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAuthorData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    nftPost(data);
  }

  useEffect(() => {
    fetchAuthorData();
    setLoading(false);
    AOS.init();
  }, []);

  function CustomNextArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-arrow"
        style={{
          ...style,
          position: "absolute",
          top: "45%",
          right: "0px",
          zIndex: "1",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <div
          style={{
            width: "45px",
            border: "1px solid",
            borderColor: "#ccc",
            height: "45px",
            borderRadius: "9999px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "#FFFFFF",
          }}
        >
          <ChevronRightIcon style={{ width: "15px", color: "#000" }} />
        </div>
      </div>
    );
  }

  function CustomPrevArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-arrow"
        style={{
          ...style,
          position: "absolute",
          top: "45%",
          left: "0px",
          zIndex: "1",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <div
          style={{
            width: "45px",
            border: "1px solid",
            borderColor: "#ccc",
            height: "45px",
            borderRadius: "9999px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "#FFFFFF",
          }}
        >
          <ChevronLeftIcon style={{ width: "15px", color: "#000" }} />
        </div>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-up fade-in" data-aos-duration="500">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <Slider {...settings}>
              {new Array(4).fill().map((_, index) => (
                <div key={index}>
                  <div className="nft_coll" style={{ margin: "5px" }}>
                    <div className="nft_wrap ">
                      <Link to={`/item-details/}`}>
                        <div
                          src="/"
                          className="lazy img-fluid skeleton-box "
                          style={{ width: `100%`, height: "200px" }}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp ">
                      <Link to={`/author/`}>
                        <div
                          className="lazy pp-coll skeleton-box "
                          style={{
                            width: `50px`,
                            height: "50px",
                            borderRadius: "50%",
                          }}
                          src="/"
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div
                      className="nft_coll_info"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Link to="/explore">
                        <h4
                          className="skeleton-box"
                          style={{ width: `100px`, height: "20px" }}
                        ></h4>
                      </Link>
                      <span
                        className="skeleton-box"
                        style={{ width: `60px`, height: "20px" }}
                      ></span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {posts.map((post) => (
                <div key={post.id}>
                  <div className="nft_coll" style={{ margin: "5px" }}>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${post.nftId}`}>
                        <img
                          src={post.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${post.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={post.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{post.title}</h4>
                      </Link>
                      <span>ERC-{post.code}</span>
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
