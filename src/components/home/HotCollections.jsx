import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  },[])

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          fontSize: "40px",
          color: "black",
          right: "-16px",
          border: 'solid rgba(0, 0, 0, 0.2) 1px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'white'
        }}
        onClick={onClick}
      >
        ➜
      </div>
    );
  };

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          fontSize: "40px",
          color: "black",
          left: "-16px",
          top: '42%',
          transform: "rotate(180deg)",
          border: 'solid rgba(0, 0, 0, 0.2) 1px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'white',
          zIndex: '1'
        }}
        onClick={onClick}
      >
        ➜
      </div>
    );
  };

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      }
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
          <div className="slider-container">
            {loading ? (
              <Slider {...settings}>
                {new Array(4).fill(0).map((_, index) => (
                  <div className="p-2" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton width="100%" height="100%" />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton width="100%" height="100%" borderRadius="50%" />
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <Skeleton width="100%" height="100%" borderRadius="50%" />
                        </Link>
                        <span><Skeleton width="100%" height="100%" /></span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider key={data.length} {...settings}>
                {data.map((nft) => (
                  <div className="p-2" key={nft.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img src={nft.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img className="lazy pp-coll" src={nft.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{nft.title}</h4>
                        </Link>
                        <span>ERC-{nft.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
