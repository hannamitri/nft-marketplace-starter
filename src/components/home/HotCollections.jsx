import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import Skeleton from "../UI/Skeleton";


//TODO - Change Next and Previous Arrows to use FA / react-icons 
    //and create my own arrow from scratch

// API - https://us-central1-nft-cloud-functions.cloudfunctions.net/hotColections

const HotCollections = () => {

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  //This is for the skelly state. This creates 3 faux entries 
    //and gives them unique keys.
  const loadingArr = new Array(3).fill(null);

  async function getCollections() {
    const { data } = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
    setCollections(data);
    setLoading(false);
  }


  //Settings, Arrow Config for Owl Slider
  function NextArrow({ onClick }) {
    return (
      <RiArrowDropRightLine
        className="slick-arrow"
        style={{
          position: "absolute",
          color: "#999",
          cursor: "pointer",
          top: "50%",
          right: "0px",
          transform: "translate(0, -50%)",
          height: "50px",
          width: "50px",
          fontSize: "6px",
          display: "block",
          border: "1px solid #ccc",
          backgroundColor: "white",
          borderRadius: "100%",
          zIndex: "10"
         }}
        onClick={onClick}
      />
    );
  }
  function PrevArrow({ onClick }) {
    return (
      <RiArrowDropLeftLine
        className="slick-arrow"
        style={{ 
          position: "absolute",
          color: "#999", 
          cursor: "pointer",
          top: "50%",
          left: "0px",
          transform: "translate(0, -50%)",
          height: "50px",
          width: "50px",
          fontSize: "12px",
          display: "block",
          border: "1px solid #ccc",
          backgroundColor: "white",
          borderRadius: "100%",
          zIndex: "10"
        }}
        onClick = {onClick}
      />
    );
  }

  const settings = { 
    arrows: true,
    draggable: true,
    infinite: true,
    speed: 500,
    initialSlide: 1,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: false,
    responsive: [
      {
        breakpoint: 2000, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 980, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 765, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
        }
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  

  useEffect(() => {
    getCollections();
  },[])

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
          <Slider className="hotSlider"{...settings}>
            {loading ? loadingArr.map((_, index) => (
              <div className="col-12" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton
                      width="100%"
                      height="100%"
                      borderRadius="10px"
                    />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton
                      width="60px"
                      height="60px"
                      borderRadius="100%"
                    />
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton 
                      width="100px"
                      height="16px"
                    />
                    <br/>
                    <Skeleton
                      width="40px"
                      height="16px"
                    />
                    </div>
                </div>
              </div> 
            ))
            :collections.map((collection, index) => (
            /* col-lg-3 col-md-6 col-sm-6 col-xs-12 */
            <div className="col-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collection.authorImage} alt="" />
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
          ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
