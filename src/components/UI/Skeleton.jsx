import React from "react";

import Slider from "react-slick/lib/slider";
const Skeleton = ({ width, height, borderRadius }) => {

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", borderRadius:"20px", padding:"1px 0px 0px 0px", margin:"0px 30px"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", borderRadius:"20px", padding:"1px 0px 0px 0px", margin:"0px 30px"}}
        onClick={onClick}
      />
    );
  }
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false

        }
      }
    ]
  };
  return (
   <Slider {...settings}>{new Array(4).fill(0).map((_, index) => (
      <div className="" key={index}>
        <div className="nft_coll">
          <div className="nft_wrap">
            
              <div className="skeleton-box" style={{width:"400px", height:"200px", borderRadius}}/>
            
          </div>
          <div className="nft_coll_pp">
           
              <div className="skeleton-box" src="" style={{width:"40px", height:"40px", borderRadius:"100%"}} alt="" />
            
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            
              <div className="skeleton-box" style={{width:"100px", height:"20px"}}></div>
              <br></br>
              <span className="skeleton-box" style={{width:"80px", height:"20px"}}></span>
           
          </div>
        </div>
      </div>
    ))}</Slider>
  );
};

export default Skeleton;
