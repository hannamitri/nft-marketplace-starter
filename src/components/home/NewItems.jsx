import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton.jsx";

 const CountDownTimer = ({expiryDate}) => {
      const[timeLeft, setTimeLeft] = useState("");

        useEffect(() => {
        const calculateTime = () => {
          const currentTime = new Date().getTime();
          const timeDifference = expiryDate - currentTime;

          if (timeDifference <= 0) {
            setTimeLeft("Expired");
            return;
          }

          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);

        return () => clearInterval(timer);
      }, [expiryDate]);

      return <div className="de_countdown">{timeLeft}</div>;
    };

const NewItems = () => {
  
    const [newItems, setNewItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      axios
        .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
        .then((response) => {
          setNewItems(response.data);
          setLoading(false);
      })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 992, 
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768, 
        settings: { slidesToShow: 1 }
      }
    ]
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
            <div className="d-flex">
              {new Array(4).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-sm-12" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width={100} height={200} />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width={50} height={50} borderRadius={50} />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width={100} height={20} />
                      <br />
                      <Skeleton width={60} height={15} />
                      </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <Slider {...settings}>
          {newItems.map((data, index) =>(
            <div className="px-2" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${data.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${data.authorId}`}
                  >
                    <img className="lazy" src={data.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                { data.expiryDate && (
                  <CountDownTimer expiryDate={data.expiryDate} />
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

                  <Link to={`/item-details/${data.nftId}`}>
                    <img
                      src={data.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${data.nftId}`}>
                    <h4>{data.title}</h4>
                  </Link>
                  <div className="nft__item_price">{data.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{data.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
