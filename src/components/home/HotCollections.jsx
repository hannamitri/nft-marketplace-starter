import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-prev" onClick={onClick}>
      ‹
    </button>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-next" onClick={onClick}>
      ›
    </button>
  );
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    swipeToSlide: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.log("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            {new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                <div className="nft_coll">
                  <div
                    style={{
                      background: "#eee",
                      height: "200px",
                      borderRadius: "8px",
                    }}
                  ></div>
                  <div
                    style={{
                      background: "#ddd",
                      height: "20px",
                      width: "60%",
                      marginTop: "10px",
                    }}
                  ></div>
                  <div
                    style={{
                      background: "#ddd",
                      height: "14px",
                      width: "40%",
                      marginTop: "6px",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            <Slider {...settings}>
              {collections.slice(0, 6).map((collection, index) => (
                <div key={index}>
                  <div className="px-2">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/hot/${collection.id}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt={collection.title}
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId || collection.author || collection.id}`}>
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt={collection.title}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Link to={`/item-details/hot/${collection.id}`}>
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>
                          {[192, 661, 164, 112, 68, 316][index] || collection.id}
                        </span>
                      </div>
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