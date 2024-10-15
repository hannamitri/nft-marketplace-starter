import React from "react";
import Slider from "react-slick/lib/slider";

const SkeletonNewItems = ({ width, height, borderRadius }) => {

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
    return(
        <Slider {...settings}>
          {new Array(4).fill(0).map((_, index) => (
            <div className="" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  
                    <div className="skeleton-box" style={{width:"50px", height:"50px", borderRadius:"100%"}} alt="" />
                    <i className="fa fa-check"></i>
                  
                </div>
                

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div to="/item-details">
                    <div
                      
                      className="skeleton-box"
                      style={{width:"250px", height:"250px"}}
                      alt=""
                    />
                  </div>
                </div>
                <div className="nft__item_info ">
                  <div className="skeleton-box" style={{width:"100px", height:"20px"}} >
                    <h4></h4>
                  </div>
                  <br></br>
                  
                  <div className="nft__item_price skeleton-box" style={{width:"50px", height:"20px"}}></div>
                  <br></br>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          ))}</Slider>
    )
}


export default SkeletonNewItems