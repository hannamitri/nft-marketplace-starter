import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";

function StyledNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#32de84", borderRadius: "20px"}}
      onClick={onClick}
    />
  );
}

function StyledPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#32de84", borderRadius: "20px"}}
      onClick={onClick}
    />
  );
}

// export default class SimpleSlider extends Component {
  const Carousel = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
      async function fetchData () {
        console.log("run or no")
        await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
        .then(response => {
          // Handle the successful response
          console.log(`victory`)
          setData(response.data)
        })
        .catch(error => {
          // Handle the error
          console.error(`the error is ${error}`);
        });
      }
      fetchData();
    }, [])
    
    if (!data.length) {
      return <h1>Loading...</h1>;
    }

    const slidesToShow = 4;
    const slideWidth = 100 / slidesToShow + "%";

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      nextArrow: <StyledNextArrow />,
      prevArrow: <StyledPrevArrow />,
    };
    return (
      <div>
        {/* <h2> Single Item</h2> */}
        <Slider {...settings}>
        {data.map((element, index) => (
            // <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            // we want to change nftcoll
            <div key={index} >
              <div className="nft_coll" style={{
              tabindex: "1",
              marginLeft: "10px"
            }}>
                <div className="nft_wrap">
                  <Link to={`/item-details/${element.nftId}`}>
                    <img src={element.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={element.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{element.title}</h4>
                  </Link>
                  <span>ERC-{element.code}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
}

export default Carousel