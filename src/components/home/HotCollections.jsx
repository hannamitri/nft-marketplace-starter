import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css";

const HotCollections = () => {
  const { id } = useParams();
  const [hotcollections, setHotcollections] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function fetchHotCollections() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections?=${id}`,
      );
      setHotcollections(data);
      setLoading(false);
    }
    fetchHotCollections();
  }, [id]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: false,
    centerMode: false,
    prevArrow: (
      <button type="button" className="slick-prev">
        <i className="fa fa-angle-left"></i>
      </button>
    ),
    nextArrow: (
      <button type="button" className="slick-next">
        <i className="fa fa-angle-right"></i>
      </button>
    ),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
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
          <Slider {...settings} className="collections-carousel">
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="hotcollections" key={index}>
                    <div className="hotcollections__nftImage--skeleton"></div>
                    <div className="hotcollections__authorImage--skeleton"></div>
                    <div className="hotcollections__title--skeleton"></div>                    
                    <div className="hotcollections__code--skeleton"></div>                    
                  </div>
                ))
              : (hotcollections.map((item, index) => (
              <div key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item.nftId}`}> 
                      <img
                        src={item.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>                    
                  </div>
                            
                  <div className="nft_coll_pp">
                    <Link to={`/author/${item.authorId}`}>                    
                      <img
                        className="lazy pp-coll"
                        src={item.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{item.title}</h4>
                    </Link>
                    <span>ERC-{item.code}</span>
                  </div>
                </div>
              </div>
              )))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
