import React from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import "../../css/HotCollections.css"

// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "react-loading-skeleton";

import Slider from 'react-slick' 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {

  const [imgs, setImgs] = useState([])
  const [loading, setLoading] = useState(true)
  
  async function Imgdata() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setImgs(data)
    setLoading(false)
  }
  
  
  useEffect(() => {
    Imgdata()
  }, [])

  const settings = {
    slidesToShow: 4,
    accessibility: true,
    draggable: false,
    dots: false,
    arrows: true,
    infinite: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
           infinite: true,
          
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
           infinite: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          infinite: true,
        }
      }
    ]
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black",}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

  // const options = {
  //   items:4,
  //   loop: true,
  //   margin: 10,
  //   nav: true, 
  //   dots: false,
  //   responsive: {
  //     0: {
  //       items:1
  //     },
  //     640: {
  //       items:2
  //     },
  //     1050:{
  //       items:3
  //     },
  //     1620:{
  //       items:4
  //     }
  //   },
  // }

  return (
    <section id="section-collections" className="no-bottom">
      {/* <div className="post">
            <div className="post__title">
              <div className="post__title--skeleton"></div>
            </div>
            <div className="post__body">
              <p className="post__body--skeleton"></p>
            </div>
          </div> */}
      <div className="container">
        <div className="row " >
        
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        {
          {
            loading ? (
              new Array(4).fill(0).map((_, index) =>{
                <div className="post">
            <div className="post__title">
              <div className="post__title--skeleton"></div>
            </div>
            <div className="post__body">
              <p className="post__body--skeleton"></p>
            </div>
          </div>
              })
            )
          }
          :
          <Slider  {...settings}>
          {
              (
              imgs.map(img => (
                <div className="nft_coll">
              <div className="nft_wrap ">
                <Link to="item-details" 
                // {`/${item-details}`}
                >
                  <img src={img.nftImage} className="lazy img-fluid" alt="" />
                </Link>
              </div>
              <div className="nft_coll_pp">
                <Link to="/author"
                // {`/${author}`}
                >
                  <img className="lazy pp-coll" src={img.authorImage} alt="" />
                </Link>
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
                <Link to="/explore"
                // {`/${explore}`}
                >
                  <h4>{img.title}</h4>
                </Link>
                <span>ERC-${img.code}</span>
              </div>
            </div>
              ))
          )
        }
      </Slider>
}
        {/* <Slider  {...settings}>
        {
          imgs.map(img => (
                   <div className="nft_coll">
                 <div className="nft_wrap ">
                   <Link to="item-details" 
                   // {`/${item-details}`}
                   >
                     <img src={img.nftImage} className="lazy img-fluid" alt="" />
                   </Link>
                 </div>
                 <div className="nft_coll_pp">
                   <Link to="/author"
                   // {`/${author}`}
                   >
                     <img className="lazy pp-coll" src={img.authorImage} alt="" />
                   </Link>
                   <i className="fa fa-check"></i>
                 </div>
                 <div className="nft_coll_info">
                   <Link to="/explore"
                   // {`/${explore}`}
                   >
                     <h4>{img.title}</h4>
                   </Link>
                   <span>ERC-${img.code}</span>
                 </div>
               </div>
          ))
        }
      </Slider> */}

          { 
          /* {
            loading ? (
              new Array(4).fill(0).map((_, index) =>{
                <div className="post" key={index}>
            <div className="post__title">
              <div className="post__title--skeleton"></div>
            </div>
            <div className="post__body">
              <p className="post__body--skeleton"></p>
            </div>
          </div>
              })
            )
            :
            ( */
              //   imgs.map(img => (
              //     <div className="nft_coll">
              //   <div className="nft_wrap ">
              //     <Link to="item-details" 
              //     // {`/${item-details}`}
              //     >
              //       <img src={img.nftImage} className="lazy img-fluid" alt="" />
              //     </Link>
              //   </div>
              //   <div className="nft_coll_pp">
              //     <Link to="/author"
              //     // {`/${author}`}
              //     >
              //       <img className="lazy pp-coll" src={img.authorImage} alt="" />
              //     </Link>
              //     <i className="fa fa-check"></i>
              //   </div>
              //   <div className="nft_coll_info">
              //     <Link to="/explore"
              //     // {`/${explore}`}
              //     >
              //       <h4>{img.title}</h4>
              //     </Link>
              //     <span>ERC-${img.code}</span>
              //   </div>
              // </div>  
            // ))
          // )
        }


        </div>
      </div>
    </section>
  );
};

export default HotCollections;