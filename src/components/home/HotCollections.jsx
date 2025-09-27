import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );

    setHotCollections(data);
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  function NextArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="custom-arrow next"
        style={arrowStyle("right")}
      >
        <i className="fa fa-chevron-right" style={{ fontSize: 16 }} />
      </div>
    );
  }
  function PrevArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="custom-arrow prev"
        style={arrowStyle("left")}
      >
        <i className="fa fa-chevron-left" style={{ fontSize: 16 }} />
      </div>
    );
  }
  const arrowStyle = (side) => ({
    position: "absolute",
    top: "50%",
    [side]: "-25px",
    transform: "translateY(-50%)",
    zIndex: 2,
    width: 40,
    height: 40,
    background: "#fff",
    borderRadius: "50%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "black",
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
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
          <div className="owl-carousel owl-theme owl-loaded owl-drag">
            {hotCollections.length ? (
              <Slider {...settings}>
                {hotCollections.map((collect) => (
                  <div className="px-1" key={collect.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collect.nftId}`}>
                          <img
                            src={collect.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collect.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={collect.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collect.title}</h4>
                        </Link>
                        <span>ERC-{collect.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <>
                <Slider className="owl-theme" {...settings}>
                  {new Array(8).fill(0).map((_, index) => (
                    <div className="nft_coll" key={index}>
                      <div className="nft_wrap">
                        <Link to={``}>
                          <Skeleton width="100%" height="200px" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={``}>
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="">
                          <Skeleton width="100px" height="20px" />
                        </Link>
                        <br />
                        <Skeleton width="60px" height="20px" />
                      </div>
                    </div>
                  ))}
                </Slider>
              </>
            )}
            <div className="owl-dots"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
