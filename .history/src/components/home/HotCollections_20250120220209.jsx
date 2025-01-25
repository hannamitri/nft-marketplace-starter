import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [data, setData] = useState([]);

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className='sliderArrow CarR'
        style={{ display: "block"}}
        onClick={onClick}
      >
        ›
      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const {onClick } = props;
    return (
      <div
        className='sliderArrow CarL'
        style={{ display: "block" }}
        onClick={onClick}
      >
        ‹
      </div>
    );
  }
  

  const sliderSettings = {
    infinite: true,
    speed: 250,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          speed: 250,
         
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
      
          arrows: true,
          speed: 250,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
      
          arrows: true,
          speed: 250,
        },
      },
    ],
  };

  async function fetchData() {
    try {
      const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      
    console.log(response.data)
    // setData(response.data)
    
    } catch (error) {
      if (error.response) {
        console.error('Error Data:' + error.response.data)
      } else if (error.request) {
        console.error('Error Request:' + error.request)
      } else {
        console.error('Error:', error.message)
      }
    }
    
  }

  useEffect(() => {
    fetchData()
  }, []);

  
 
  
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



    {data && data.length > 0 ? (
<Slider {...sliderSettings}>
{data.map((card) => (
  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-1" key={card.id}>
    <div className="nft_coll">
      <div className="nft_wrap">
        <Link to="/item-details">
          <img src={card.nftImage} className="lazy img-fluid" alt="" />
        </Link>
      </div>
      <div className="nft_coll_pp">
        <Link to="/author">
          <img className="lazy pp-coll" src={card.authorImage} alt="" />
        </Link>
        <i className="fa fa-check"></i>
      </div>
      <div className="nft_coll_info">
        <Link to="/explore">
          <h4>{card.title}</h4>
        </Link>
        <span>ERC-{card.code}</span>
      </div>
    </div>
  </div>
))}
</Slider>
    ) : (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-1">
      <div className="nft_coll">
        <div className="nft_wrap">
        <Skeleton
        className='lazy img-fluid'
        width='100%'
        height='100%'
        />
        </div>
        <div className="nft_coll_pp">
          <Link to="/author">
            <img className="lazy pp-coll"  alt="" />
          </Link>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <Link to="/explore">
            <h4><Skeleton width='100%' height='100%'/></h4>
          </Link>
          <span>ERC-{card.code}</span>
        </div>
      </div>
    </div>
    )
      
    }
          
          </div>   
          </div>
    </section>
  );
};

export default HotCollections;
