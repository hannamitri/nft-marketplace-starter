import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/NewItems.css"

const NewItems = () => {

  const [newItemData, setNewItemData]= useState([])
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now())
  

  async function getData() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
    setNewItemData(data)
    setLoading(false)
  }

  useEffect(()=>{
    const timer = setInterval(()=> setNow(Date.now()),1000);
    getData()
    return () => clearInterval(timer)
  },[])

  function time(expDate, nowTime) {
  let mill = expDate - nowTime;
  let totalSeconds = Math.floor(mill / 1000);         
  let hours = Math.floor(totalSeconds / 3600);      
  let minutes = Math.floor((totalSeconds % 3600) / 60); 
  let seconds = totalSeconds % 60;     
  return `${hours}h ${minutes}m ${seconds}s`;
  }

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
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

          <Slider {...settings}>
            {loading?
            new Array(4).fill(0).map((_, index) => (
            <div className="item" key={index}>
              <div className="nft__item">
                <div className="nft__item_wrap">
                    <Skeleton width="100%" height="90%" borderRadius={8}></Skeleton>
                </div>
                <div className="nft__item_info">
                  <Skeleton width={60} height={20} borderRadius={8} />
                </div>
              </div>
            </div>
          ))
          :
          newItemData.map((item) => (
            <div className="item" key={item.id}>
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
                {item.expiryDate && <div className="de_countdown">{time(item.expiryDate, now)}</div>}
                <div className="nft__item_wrap">
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
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
          }
          
          
            
          </Slider>

        </div>
      </div>
    </section>
  );
};

export default NewItems;
