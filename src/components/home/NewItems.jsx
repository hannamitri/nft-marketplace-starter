import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from 'axios'
import { useState, useEffect } from 'react'
import Item from "../UI/Item";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HotCollectionsNext from "./HotCollectionsNext";
import HotCollectionsPrev from "./HotCollectionsPrev";
import "../../css/styles/slider-arrows.css"
import "../../css/styles/item-skeleton.css"
import Skeleton from "../UI/Skeleton"

const NewItems = () => {

  const [items, setItems] = useState([])
  const getItems = async () => {
    await axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((response) => {
        setItems(response.data)
      })
  }

  let settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <HotCollectionsNext />,
    prevArrow: <HotCollectionsPrev />,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      },
    ]
  }

  useEffect(() => {
    getItems()
  }, [])

  const loading = items.length === 0

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
          <Slider key={loading ? "loading" : "loaded"} {...settings}>
            {loading 
            ? new Array(4).fill(0).map((_, index) => (
              <div key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton 
                      width="50px" 
                      height="50px" 
                      borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft__item_wrap" 
                  style={{display: "flex", justifyContent: "center"}}>
                    <Skeleton 
                      width="100%" 
                      height="200px" 
                      style={{borderRadius: "8px"}}/>
                  </div>
                  <div className="nft__item_info">
                    <Skeleton 
                      width="60%" 
                      height="20px" />
                    <div style={{ marginTop: "10px" }}>
                      <Skeleton 
                        width="40%" 
                        height="16px" />
                    </div>
                  </div>
                </div>
              </div>
            )) : items.map((item, index) => (
                <Item
                  key={index}
                  authorId={item.authorId}
                  authorImage={item.authorImage}
                  nftImage={item.nftImage}
                  nftId={item.nftId}
                  title={item.title}
                  price={item.price}
                  likes={item.likes}
                  expiryDate={item.expiryDate}
                />
              ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
