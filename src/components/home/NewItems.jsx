import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Slider from "react-slick";
import "./NewItems.css";
import axios from "axios";


const NewItems = () => {
const { id } = useParams();
const [newitems, setNewitems] = React.useState([]);
const [loading, setLoading] = React.useState(true)

useEffect(() => {
async function fetchNewItems() {
const { data } = await axios.get(
  `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems?=${id}`

)
setNewitems(data);
setLoading(false);
}
fetchNewItems();
}, []);

const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 43 * 60 + 14);

useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft((prevTime) => {
      if (prevTime <= 0) {
        clearInterval(interval);
        return 0;
      }

      return prevTime - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);

const hours = Math.floor(timeLeft / 3600);
const minutes = Math.floor((timeLeft % 3600) / 60);
const seconds = timeLeft % 60;


const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: false,
    centerMode: false,
    prevArrow: (
      <button type="button" className="slick-prev">
        <i className="fa fa-angle-left"></i>
      </button>
    ),
    nextArrow: (
      <button type="button" className="slick-next">
        <i className="fa fa-angle-right"></i>
      </button>
    ),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
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
          <Slider {...settings} className="collections-carousel">                   
          {loading
          ? new Array(4).fill(0).map((_, index) => (            
                  <div className="newitems" key={index}>
                    <div className="newitems__nftImage--skeleton"></div>
                    <div className="newitems__authorImage--skeleton"></div>
                    <div className="newitems__title--skeleton"></div>                    
                    <div className="newitems__code--skeleton"></div>                    
                  </div>
                ))
             : (newitems.map((item, index) => ( 
            <div key={index}>
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
                  {hours}h {minutes}m {seconds}s
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="#" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="#" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="#">
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
          )))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
