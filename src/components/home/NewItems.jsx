import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ItemCard from "../UI/ItemCard";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function fetchNewItems() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setItems(data);
      setIsLoaded(true)
    }
    fetchNewItems();
  }, []);


  const arrowStyle = {
    // arrow styling (had to manual style as react-slick doesn't allow complete customization for the arrows)
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "50px",
    backgroundColor: "#fff",
    border: "2px solid #ccc",
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: 1,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        style={{ ...arrowStyle, left: "-14px" }} // Adjust for responsiveness
        onClick={onClick}
      >
        <FaArrowLeft style={{ color: "black", fontSize: "20px" }} />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        style={{ ...arrowStyle, right: "-14px" }} // Adjust for responsiveness
        onClick={onClick}
      >
        <FaArrowRight style={{ color: "black", fontSize: "20px" }} />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default for large screens
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablets and small desktops
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile landscape
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Mobile portrait
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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
        {
          isLoaded ? 
          (  <Slider {...settings}>
            {items.map((item) => (
              <div key={item.id}>
               <ItemCard item={item}/>
              </div>
            ))}
          </Slider>) 
          : 
          (  <Slider {...settings}>
            {new Array(4).fill(0).map((_, index) => (
              <div key={index}>
                <div className="nft__item gap">
                  <div className="author_list_pp">
                    <div className="skeleton-box" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
                  </div>

                  <div className="nft__item_wrap">
                    <div className="skeleton-box" style={{ width: '100%', height: '200px' }}></div>
                  </div>
                  <div className="nft__item_info">
                    <div className="skeleton-box" style={{ width: '80%', height: '20px', marginBottom: '10px' }}></div>
                    <div className="skeleton-box" style={{ width: '60%', height: '20px' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>) 
}
        </div>
      </div>
    </section>
  );
};

export default NewItems;