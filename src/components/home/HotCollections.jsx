import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import Slider from "react-slick";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/components-css/ReactSlickSlider.css"

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching collections:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
  useEffect(() => {
    if (!loading && collections.length > 0) {
      setIsReady(true);
    }
  }, [loading, collections]);

  function ArrowNext(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={`arrow ${className}`}
          onClick={onClick}
          style={{
            ...style,
            position: "absolute",
            right: "-12px",
            top: "50%",
            display: "flex",
          }}
        >
          <AiOutlineArrowRight className="arrows" style={{color:"black"}}/>
        </div>
      );
    }
    function ArrowPrev(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={`arrow ${className}`}
          style={{
            ...style,
            position: "absolute",
            left: "-12px",
            top: "50%",
            display: "flex",
          }}
          onClick={onClick}
        >
          <AiOutlineArrowLeft className="arrows" style={{color:"black"}}/>
        </div>
      );
    }

  var settings = {
    margin: 10,
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    className:"slides",
    nextArrow: <ArrowNext to="next"/>,
    prevArrow: <ArrowPrev to="prev"/>,
    responsive: [
      {
        breakpoint: 1024,
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
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderLoadingItems = () => (
    <div className="row">
      {Array(4).fill(null).map((_, index) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={`loading-${index}`}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <div className="skeleton-wrapper">
                <Skeleton width="100%" height="200px" />
              </div>
            </div>
            <div className="nft_coll_pp">
              <div className="skeleton-wrapper">
                <Skeleton width="60px" height="60px" borderRadius="100px" />
              </div>
            </div>
            <div className="nft_coll_info">
              <div className="skeleton-wrapper">
                <Skeleton width="80px" height="19.19px" />
              </div>
              <div className="skeleton-wrapper">
                <Skeleton width="50.66px" height="18px" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCollections = () => (
    <Slider {...settings}>
      {collections.map((elem, id) => (
        <div className="" key={id}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Link to="/item-details">
                <img src={elem.nftImage} className="lazy img-fluid" alt="" />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to="/author">
                <img className="lazy pp-coll" src={elem.authorImage} alt="" />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <h4>{elem.title}</h4>
              </Link>
              <span>ERC-{elem.code}</span>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );

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
          {!isReady ? renderLoadingItems() : renderCollections()}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;