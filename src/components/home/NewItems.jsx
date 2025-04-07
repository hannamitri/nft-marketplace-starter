import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewItemsSkeleton from "../NewItemsSkeleton";
import NftCard from "../NftCard";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  async function fetchNewItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(data);
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 250,
    slidesToShow: 4,
    slideToScroll: 1,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function renderNewItems() {
    return newItems.map((item) => {
      return (
        <div className="px-2" key={item.id}>
            <NftCard item={item}/>
        </div>)
    });
  }


  function renderNewItemsSkeleton() {
    return Array(6)
      .fill(0)
      .map((_, i) => {
        return <NewItemsSkeleton key={i} />;
      });
  }

  useEffect(() => {
    fetchNewItems();
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
          <Slider {...settings}>
            {isLoading ? renderNewItemsSkeleton() : renderNewItems()}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;