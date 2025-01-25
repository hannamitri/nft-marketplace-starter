import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";



const NewItems = () => {
  const [data, setData] = useState();
  const [currentTime, setCurrentTime] = useState(Date.now());

  setInterval(() => {
    setCurrentTime(Date.now())
  }, 1000);

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

async function getData() {
    try {
      const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
      setData(response.data)
        
      } catch (error) {
        if (error.response) {
          console.log('Error Response:' + error.response.data)
        } else if (error.request) {
          console.log('Error request:' + error.request)
        } else {
          console.log(error.message)
        }
      }
}

  useEffect(() => {
      getData();
  }, []);


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {data ? (
            <Slider {...sliderSettings}>
            }
            </Slider>
              ) : (<>Skeleton!</>)
            }
        </div>
        </div>
        </section>
      );
};

export default NewItems;
