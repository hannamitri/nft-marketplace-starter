import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => {
  return (
    <button
      type="button"
      className="custom-arrow custom-next"
      onClick={onClick}
    >
      →
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      type="button"
      className="custom-arrow custom-prev"
      onClick={onClick}
    >
      ←
    </button>
  );
};

const HotCollections = ({ hotCollections, loading }) => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '26px',
        }
      }
    ]

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
  {loading
    ? new Array(4).fill(0).map((_, index) => (
        <div key={index}>
          <div className="nft_coll skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-author"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-code"></div>
          </div>
        </div>
      ))
    : hotCollections.map((item, index) => (
  <div
    key={item.id}
    className="nft_coll"
    onClick={() =>
      navigate(`/item-details/${item.nftId}`, {
        state: {
item,
dettailId: index + 1,
        },
      })
    }
    style={{ cursor: "pointer" }}
  >
            <div className="nft_wrap">
              <img
                src={item.nftImage}
                className="lazy img-fluid"
                alt={item.title}
              />
            </div>

            <div className="nft_coll_pp">
              <Link
                to={`/item-details/${item.nftId}`}
                state={{ item }}

                onClick={(e) => e.stopPropagation()}
              >
                <img
                  className="lazy pp-coll"
                  src={item.authorImage || item.ownerImage}
                  alt="item. title"
                />
              </Link>

            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <h4>{item.title}</h4>
            <span>ERC-{item.code}</span>
          </div>
        </div>
      ))}

</Slider>
        </div>
      </div>
    </section>
  );
};




export default HotCollections;
