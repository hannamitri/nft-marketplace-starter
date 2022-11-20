import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaAngleRight } from "react-icons/fa";


//TODO - Change Next and Previous Arrows to use FA / react-icons 
    //and create my own arrow from scratch

// API - https://us-central1-nft-cloud-functions.cloudfunctions.net/hotColections

const HotCollections = () => {

  const [collections, setCollections] = useState([]);

  async function getCollections() {
    const { data } = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
    setCollections(data);
  }


  //Settings, Arrow Config for Owl Slider
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          height: "50px",
          width: "50px",
          display: "block",
          border: "1px solid grey",
          borderRadius: "100%",
         }}
        onClick={onClick}
      />
    );
  }
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    console.log(props);
    return (
      <div
        className={className}
        style={{ ...style, content: "Hello",color: "black", display: "block", background: "red" }}
        onClick={onClick}
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
        breakpoint: 570, 
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
          {collections.map((collection, index) => (
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
