import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick/lib/slider";
import SkeletonNewItems from "../UI/SkeletonNewItems";

const NewItems = () => {


  const [newItem, setNewItem] = useState([])
  const [loading, setLoading] = useState(true)
  


  async function newItems() {
    setLoading(true)
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
   
    setNewItem(data)
    setLoading(false)
    
    
  }
  useEffect(() => {
    newItems()
    const intervalId = setInterval(() => {
      setNewItem(prevItem => 
        prevItem.map(item => ({
          ...item,
          countdown: item.expiryDate ? Math.max(0,
          item.expiryDate - Date.now()) : null
        }))
      )
    }, 1000);
    return () => clearInterval(intervalId)
  },[])
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", borderRadius:"20px", padding:"1px 0px 0px 0px", margin:"0px 30px"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", borderRadius:"20px", padding:"1px 0px 0px 0px", margin:"0px 30px"}}
        onClick={onClick}
      />
    );
  }
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false

        }
      }
    ]
  };

  function formatCountDown(ms){
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms/ (1000 * 60)) % 60;
    const hours = Math.floor(ms/ (1000 * 60 * 60))
    return `${hours}h:${minutes}m:${seconds}`;
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
          
{        loading ? <SkeletonNewItems/> :  <Slider {...settings}>
          {newItem.map((newI, index) => (
            <div className="" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${newI.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={newI.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {newI.expiryDate && <div className="de_countdown">
                  <span  className="timer__hour">{formatCountDown(newI.countdown)}</span>
                  
                </div>}

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

                  <Link to={`/item-details/${newI.nftId}`}>
                    <img
                      src={newI.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{newI.title}</h4>
                  </Link>
                  <div className="nft__item_price">{newI.price}ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{newI.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}</Slider>}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
