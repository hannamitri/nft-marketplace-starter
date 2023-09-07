import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { getHotCollections } from "../../api/hotcollections";
import { Skeleton } from "@mui/material";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MdOutlineKeyboardArrowRight
      className={className}
      style={{
        ...style,
        hoverscale: "10%",
        position: "absolute",
        zIndex: "1",
        right: "5",
        top: "55%",
        overflow: "hidden",
        display: "block",
        background: "white",
        border: "thin solid gray",
        color: "gray",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MdOutlineKeyboardArrowLeft
      className={className}
      style={{
        ...style,
        position: "absolute",
        zIndex: "1",
        left: "5",
        top: "55%",
        overflow: "hidden",
        display: "block",
        background: "white",
        border: "thin solid gray",
        color: "gray",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

const HotCollections = () => {
  const [loading, setLoading] = useState(true);

  const [hotCollections, setHotCollections] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const hotcollections = await getHotCollections();
      setHotCollections(hotcollections);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    fetchData();
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
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
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
        </div>
          <Slider {...settings}>
            {hotCollections.map((hotCollection) => (
              <div className="relative" key={hotCollection.id}>
                <div className="nft_coll mx-2">
                  <div className="nft_wrap">
                    {loading ? (
                      <Skeleton variant="rectangular" width={400} height={400} />
                    ) : (
                    <Link
                      to={{
                        pathname: `/item-details/${hotCollection.authorId}`,
                      }}
                    >
                      <img
                        src={hotCollection.nftImage}
                        className="lazy img-fill"
                        alt=""
                      />
                    </Link>
                    )}
                  </div>
                  <div className="nft_coll_pp">
                   {loading ? (
                      <Skeleton variant="circular" width={50} height={50} />
                    ) : ( 
                    <Link to=
                    {{
                      pathname:`/author/${hotCollection.authorId}`
                      }}>
                      <img
                        className="lazy pp-coll"
                        src={hotCollection.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                    )}
                    </div>
                  <div className="nft_coll_info">
                    {loading ? (
                      <Skeleton  />
                    ) : (
                    <Link to="/explore">
                      <h4>{hotCollection.title}</h4>
                    </Link>
                    )}
                    {loading ? (
                      <Skeleton  />
                    ) : (
                      <span>ERC-{hotCollection.code}</span>
                    )
                    }
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        
      </div>
    </section>
  );
};

export default HotCollections;
