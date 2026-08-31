import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SliderImport from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = SliderImport.default || SliderImport;

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
    setCollections(data);
     
    setTimeout(() => {
      setLoading(false);
    }, 1000); 

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function PrevArrow(props) {
  const { onClick } = props;

  return (
    <button className="custom-prev" onClick={onClick}>
      <i className="fas fa-chevron-left"></i>
    </button>
  );
}

function NextArrow(props) {
  const { onClick } = props;

  return (
    <button className="custom-next" onClick={onClick}>
      <i className="fas fa-chevron-right"></i>
    </button>
  );
}

  return (
    <section id="section-collections" className="no-bottom"   data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Slider {...settings}>
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll skeleton-card">
                      <div className="skeleton-img"></div>
                      <div className="skeleton-avatar"></div>
                      <div className="skeleton-title"></div>
                      <div className="skeleton-code"></div>
                    </div>
                  </div>
                ))
              ) : (
                collections.map((collection) => (
                  <div key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img src={collection.nftImage} className="lazy img-fluid" alt="" />
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
                ))
              )}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
