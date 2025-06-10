import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        setCollections(data);
      } catch (error) {
        console.error("Error fetching hot collections data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const NextArrow = ({ className, style, onClick }) => (
    <div
      className={`${className} custom-slick-arrow right-[-20px]`}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        zIndex: 2,
      }}
      onClick={onClick}
    >
      <i className="fa fa-chevron-right text-white text-lg" />
    </div>
  );

  const PrevArrow = ({ className, style, onClick }) => (
    <div
      className={`${className} custom-slick-arrow left-[-20px]`}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        zIndex: 2,
      }}
      onClick={onClick}
    >
      <i className="fa fa-chevron-left text-white text-lg" />
    </div>
  );


  const sliderSettings = {
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const renderSkeletons = () => {
    return Array.from({ length: 4}).map((_, index) => (
      <div key={index} className="nft_coll m-3 animate-pulse">
        <div className="nft_wrap bg-gray-300 h-48 w-full rounded-md"></div>
        <div className="nft_coll_pp mt-3 flex items-center gap-2">
          <div className="bg-gray-300 rounded-full w-10 h-10"></div>
          <i className="fa fa-check text-gray-300"></i>
        </div>
        <div className="nft_coll_info mt-2">
          <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
          <div className="bg-gray-200 h-3 w-1/2 rounded"></div>
        </div>
      </div>
    ))
  }


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>
        {loading ? (
          <div className="flex gap-4 justify-center">
            {renderSkeletons()
            }
          </div>
        ) : (
          <Slider {...sliderSettings}>
            {collections.map((collection, index) => (
              <div key={index}>
                <div className="nft_coll m-3">
                  <div className="nft_wrap">
                    <Link to={`item-details/${collection.nftId}`}>
                      <img src={collection.nftImage} className="lazy img-fluid" alt="NFT" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${collection.authorId}`}>
                      <img className="lazy pp-coll" src={collection.authorImage} alt="Author" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to={`/item-details/${collection.nftId}`}>
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>{collection.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default HotCollections;