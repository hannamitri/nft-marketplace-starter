import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton.jsx";
import ItemTile from "../UI/ItemTile.jsx";


function Slider2() {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        if (response.data) {
          setNewItems(response.data);
        } else {
          setNewItems([]);
        }
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewItems();
  }, []);

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="slider-container" style={{ padding: "0 20px" }}>
      <Slider {...settings}>
        {loading
          ? new Array(4).fill(0).map((_, index) => (
              <div key={index} style={{ padding: "0 10px"}}>
                <div className="nft__item">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <Skeleton width="100%" height="200px" />
                  <Skeleton width="100%" height="25px" style={{ display: "flex", flexDirection: "column", gap: "5px" }} />
                  <Skeleton width="80%" height="15px" /> 
                  <Skeleton width="20px" height="20px" />
                </div>
              </div>
            ))
          : newItems.map((item) => (
              <ItemTile expiryDate={item.expiryDate} nftImage={item.nftImage} authorImage={item.authorImage} id={item.id} price={item.price} title={item.title} likes={item.likes} nftId={item.nftID} authorId={item.authorId}/>
            ))}
      </Slider>
    </div>
  );
}

export default Slider2;