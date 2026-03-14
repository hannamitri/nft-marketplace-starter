import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";
import { useKeenSlider } from "keen-slider/react";
import ItemCard from "../ItemCard";


const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 15 },
    breakpoints: {
      "(max-width: 980px)": {
        slides: { perView: 2, spacing: 10 },
    }
  },
    breakpoints: {
      "(max-width: 575px)": {
        slides: { perView: 1, spacing: 5 },
    }
  }
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newCountdowns = {};
      items.forEach((item, index) => {
        const diff = item.expiryDate - now;
        if (diff > 0) {
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          newCountdowns[index] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newCountdowns[index] = "Expired";
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);
  });

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="keen-slider">
          {[1, 2, 3, 4].map((_, index) => (
            <div className="keen-slider__slide item" key={index}>
              <Skeleton
                width="50px"
                height="50px"
                borderRadius="50%"
                style={{ marginTop: "10px" }}
              />
              <Skeleton
                width="100%"
                height="250px"
                borderRadius="8px"
                style={{ margin: "0 8px" }}
              />
              <Skeleton
                width="80%"
                height="20px"
                borderRadius="4px"
                style={{ marginTop: "10px" }}
              />
              <Skeleton
                width="50%"
                height="20px"
                borderRadius="4px"
                style={{ marginTop: "10px" }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

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
          <div ref={sliderRef} className="keen-slider">
             <ItemCard items={items} countdowns={countdowns} isSlider={true} />       
            <button
              className="slider-button left"
              onClick={() => instanceRef.current?.prev()}
            >
              <img
                className="arrow left__arrow"
                src="https://static.vecteezy.com/system/resources/previews/017/784/917/non_2x/left-arrow-icon-on-transparent-background-free-png.png"
                alt="Prev"
                width="40px"
                height="40px"
                position="absolute"
              />
            </button>
            <button
              className="slider-button right"
              onClick={() => instanceRef.current?.next()}
            >
              <img
                className="arrow right__arrow"
                src="https://static.vecteezy.com/system/resources/thumbnails/017/785/208/small_2x/right-arrow-icon-on-transparent-background-free-png.png"
                alt="Next"
                width="40px"
                height="40px"
                position="absolute"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
