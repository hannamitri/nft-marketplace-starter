import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewItems.css"
import CountdownTimer from "./CountdownTimer";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init()

const NewItems = () => {
  const [loading, setLoading] = useState(true);
  const [newItems, setNewItems] = useState([]);
  const [expiryDate, setExpiryDate] = useState(null);

  useEffect(() => {
    axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
    .then((response) => {
      setTimeout(() => {
        setNewItems(response.data);
        setExpiryDate(response.data.expiryDate)
        setLoading(false);
    }, 2000)
  })
    .catch((error) => {
      console.error("No item found:", error);
    });
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 770,
      settings: {
      slidesToShow: 2,
      }
    },
    {
      breakpoint: 460,
      settings: {
        slidesToShow: 1,
      }
    }
  ]

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
          <Slider {...settings} >
          {loading ?
              new Array(4).fill(0).map((_, index) => (
                <div className= "col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
                  <div className= "skeleton__authorImage--newItems"></div>
                  <div className= "skeleton__img--newItems"></div>
                  <div className= "skeleton__title--newItems"></div>
                  <div className= "skeleton__price--newItems"></div>
                </div>
              ))
              :
          newItems.map((item, index) => (
            <div data-aos="fade-in" className="newItems" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                  {item.expiryDate ? <CountdownTimer targetDate={item.expiryDate} /> : <div></div>}
                </div>
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

                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
