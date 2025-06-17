import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../css/styles/style.css';
import Skeleton from "../UI/Skeleton";


const NewItems = () => {
  const[loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [countdowns, setCountdowns] = useState({});

  async function getItems() {
    try{
      setLoading(true)
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
      setItems(data);
    } catch(err) {
      console.error("Error fetching collections", err);
    } finally {
      setLoading(false); 
    }
  }
  
  useEffect(() => {
    getItems()
  }, [])

  function NextArrow(props) {
    const { className, onClick, style } = props;
    return <div className={className} onClick={onClick}
    style={{ ...style, color: 'black' }}>›</div>;
  }

  function PrevArrow(props) {
      const { className, onClick, style } = props;
      return <div className={className} onClick={onClick}
      style={{ ...style, color: 'black' }}>‹</div>;
    }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
      breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true, 
          dots: false    
        },
      },
    ], 
  };


  useEffect(() => {
    if(items.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const newCountdowns = {};

      items.forEach((item, idx) => {
        if (item.expiryDate) {
          const expiryTime = new Date(item.expiryDate).getTime();
          const diffSeconds = Math.floor((expiryTime - now)/1000);
          newCountdowns[idx] = diffSeconds > 0 ? diffSeconds : 0;
        }
      })
      setCountdowns(newCountdowns);
    }, 1000)

    return() => clearInterval(interval);
  }, [items])
  

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
                [...Array(4)].map((_, index) => (
                  <div key={index} style={{ padding: "15px" }}>
                    <Skeleton width="100%" height="350px" borderRadius="10px" />
                  </div>
                ))
              ) :(
                <Slider {...settings}>
          {items.map((item, id) => {
            const timeLeft = countdowns[id] ?? null;
            const hours = Math.floor(timeLeft/ 3600);
            const minutes = Math.floor ((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;

            return(
            <div key={id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {timeLeft !== null && timeLeft > 0 && (
                  <div className="de_countdown">
                    <span className="timer__hours">{hours}hr </span>
                    <span className="timer__minutes">{minutes}min </span>
                    <span className="timer__seconds">{seconds}s</span>
                </div>
              )}
                
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
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
            );
            })}
          </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
