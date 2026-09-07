import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CountdownTimer from "./UI/CountdownTimer";


const getSlidesToShow = () => {
  if (typeof window === 'undefined') return 4;
  const width = window.innerWidth;
  if (width <= 600) return 1;
  if (width <= 770) return 2;
  if (width <= 1024) return 3;
  return 4;
};

const NewItemsCarousel = () => {
    const [newItems, setNewItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

    async function DynamicNewItems() {
        const { data } = await axios.get(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(data);
        setLoading(false);
    }

    useEffect(() => {
        DynamicNewItems();
    }, []);

    const SkeletonSlide = () => (
    <div className="nft__item">
      <div className="author_list_pp skeleton-circle"></div>
      <div className="nft__item_wrap skeleton-box"></div>
      <div className="nft__item_info">
        <div className="nft__item_info h4 skeleton-line short"></div>
        <div className="nft__item_price skeleton-line tiny"></div>
      </div>
    </div>
  );


useEffect(() => {
  const handleResize = () => setSlidesToShow(getSlidesToShow());
  window.addEventListener('resize', handleResize);
  
  return () => window.removeEventListener('resize', handleResize);
}, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
  };

  return loading ? (
    <div className="skeleton-grid">
      {Array.from({ length: slidesToShow }).map((_, i) => (
        <SkeletonSlide key={i} />
      ))}
    </div>
  ) : (
    <Slider {...settings}>
    {newItems.map((Item, index) => (
            <div key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${Item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${Item.authorId}`}
                  >
                    <img className="lazy" src={Item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {Item.expiryDate && <CountdownTimer expiryDate={Item.expiryDate} />}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details">
                    <img
                      src={Item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{Item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{Item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{Item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </Slider>
  )
}

export default NewItemsCarousel