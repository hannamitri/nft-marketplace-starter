import React, { useEffect, useState } from "react";
import axios from "axios";
import NewItemsSkeleton from "./NewItemsSkeleton";
import NewItemCard from "./NewItemCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderArrow from "../UI/SliderArrow";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      )
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Unable to load new items:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const settings = {
    dots: false,
    arrows: true,
    nextArrow: <SliderArrow label="Next item" />,
    prevArrow: <SliderArrow label="Previous item" />,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
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
          {loading ? (
            <NewItemsSkeleton />
          ) : (
            <div className="col-lg-12">
              <Slider {...settings}>
                {items.map((item) => (
                  <div key={item.id}>
                    <NewItemCard item={item} />
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
