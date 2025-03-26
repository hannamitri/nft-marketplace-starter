import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from "react-loading-skeleton"







const HotCollections = () => {
  const [nft, setNft] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",  background: "none" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "none" }}
        onClick={onClick}
      />
    );
  }
  
  useEffect(() => {
    async function fetchNFTs() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
        );
        setNft(data);
      } catch (error) {
        console.error('cant fetch data')(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchNFTs();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520, // Small Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };





  return (
    <section id="section-collections" className="no-bottom">
      <div data-aos="fade-in"
              data-aos-delay='50'
              data-aos-offset='200'
              data-aos-duration="400"
              data-aos-easing="ease-in-out"
              data-aos-once='true'
              >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
          </div>
        </div>
        <Slider {...settings}>
        {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton height={200} width="100%" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton
                        circle
                        height={50}
                        width={50}
                        style={{ margin: "auto" }}
                      />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton height={20} width="60%" />
                      <Skeleton height={20} width="40%" />
                    </div>
                  </div>
                </div>
              ))
            : Array.isArray(nft) &&
              nft.slice(0, 6).map((style) => (
                <div key={style.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/ ${style.nftId}`}>
                        <img
                          src={style.nftImage}
                          className="lazy img-fluid"
                          alt={style.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/ ${style.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={style.authorImage}
                          alt="Author"
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{style.title}</h4>
                      </Link>
                      <span>ERC-{style.code}</span>
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
            