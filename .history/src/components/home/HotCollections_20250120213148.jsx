import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  
))}
</Slider>
    ) : (
      <div>
        Skeleton!!!!
      </div>
    )
      
    }
          
          </div>   
          </div>
    </section>
  );
};

export default HotCollections;
