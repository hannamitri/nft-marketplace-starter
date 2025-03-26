import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from 'axios';
import Countdown from "./Countdown";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import Card from "../Card";

const NewItems = () => {
  const [loading, setLoading] = useState([])
  const [data, setData] = useState([])
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  useEffect(()=> {
    async function fetchNewItems() {
      try {
        setLoading(true);
          const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
          console.log(response.data)
          setData(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
      }
      setLoading(false);
  }

  fetchNewItems();
  }, [])
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
          <Slider {...settings}>
          {loading ?
        new Array(4)
        .fill()
        .map((_, index) => (
          <Skeleton
            key={index}
            width={'100%'}
            height={300}
            borderRadius={5}
          />
        ))  :

          data.map((card) => (
            <div key={card.id}>
             <Card data = {card} />
            </div>
          ))}

          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
