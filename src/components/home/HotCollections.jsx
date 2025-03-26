import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from '../UI/Skeleton'

const HotCollections = () => {
   const [loading, setLoading] = useState(true);
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
  
  const [data, setData] = useState([])
  useEffect(()=> {
    async function fetchHotCollections() {
      try {
        setLoading(true);
          const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
          setData(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
      }
      setLoading(false);
  }

  fetchHotCollections();
  }, [])
    
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
        ))  
   : data.map((card) => (
      <div key = {card.id}>
        <div>
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to={`/item-details/${card.nftId}`}>
              <img src={card.nftImage} className="lazy img-fluid" alt="" />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to={`/author/${card.authorId}`}>
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
      </div>
    ))
    }
         
            </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
