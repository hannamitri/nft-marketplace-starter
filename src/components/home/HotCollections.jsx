import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/style.css";

const CustomPrevArrow = ({ onClick }) => (
  <div className="slick-arrow slick-prev" onClick={onClick}>
    <FaChevronLeft />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div className="slick-arrow slick-next" onClick={onClick}>
    <FaChevronRight />
  </div>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then(res => res.json())
      .then(data => {
        setCollections(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API fetch error:", err);
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const renderSkeletons = () =>
    new Array(4).fill(0).map((_, index) => (
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
        <div className="nft_coll skeleton">
          <div className="nft_wrap">
            <div
              className="lazy img-fluid skeleton-box"
              style={{ height: "200px", background: "#ccc" }}
            />
          </div>
          <div className="nft_coll_pp">
            <div
              className="lazy pp-coll skeleton-circle"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "#ddd",
              }}
            />
          </div>
          <div className="nft_coll_info">
            <h4
              style={{
                background: "#eee",
                height: "20px",
                width: "80%",
                marginBottom: "10px",
              }}
            >
              <span style={{ opacity: 0 }}>Loading</span>
            </h4>
            <span
              style={{
                background: "#eee",
                height: "15px",
                width: "60%",
                display: "inline-block",
              }}
            >
              &nbsp;
            </span>
          </div>
        </div>
      </div>
    ));

  return (
    <section id="section-collections" className="no-bottom hot-collections-wrapper">
      <div className="container">
        <div className="text-center hot-collections-title">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        {loading ? (
          <div className="row">{renderSkeletons()}</div>
        ) : (
          <div className="hot-collections-slider">
            <Slider {...settings}>
              {collections.map((item, index) => (
                <div key={index}>
                  <div className="collection-card">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage || nftImage}
                          className="lazy img-fluid"
                          alt={item.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage || AuthorImage}
                          alt={item.author}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <span>{item.code || "ERC-192"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotCollections;