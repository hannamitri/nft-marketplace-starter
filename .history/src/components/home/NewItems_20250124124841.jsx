import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";



const NewItems = () => {
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(Date.now());


  useEffect(() => {
    const interval = setInterval(() => {
    setData((prev) => {
      prev.map((item) => {
        const timeLeft = calcTimer(item.expiryDate)
        return(...item, )
      })
    })
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className='sliderArrow CarR'
        style={{ display: "block"}}
        onClick={onClick}
      >
        ›
      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const {onClick } = props;
    return (
      <div
        className='sliderArrow CarL'
        style={{ display: "block" }}
        onClick={onClick}
      >
        ‹
      </div>
    );
  }
  

  const sliderSettings = {
    infinite: true,
    speed: 250,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          speed: 250,
         
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
      
          arrows: true,
          speed: 250,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
      
          arrows: true,
          speed: 250,
        },
      },
    ],
  };

async function getData() {
    try {
      const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
      setData(response.data)
        
      } catch (error) {
        if (error.response) {
          console.log('Error Response:' + error.response.data)
        } else if (error.request) {
          console.log('Error request:' + error.request)
        } else {
          console.log(error.message)
        }
      }
}

  useEffect(() => {
      getData();
  }, []);

  const calcTimer = (expiryDate) => {
    let timeLeft = expiryDate - currentTime 
    
    let sec = Math.floor(timeLeft / 1000)
    let secTxt = (sec % 60)

    let min = Math.floor(sec / 60)
    let minTxt = (min % 60)

    let hrs = (Math.floor(min / 60))

    return {secTxt, minTxt, hrs, expiryDate}

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

          <Slider {...sliderSettings}>
          {data ? (
            data.map((item, index) => {
              console.log('item created')
              const timeLeft = calcTimer(item.expiryDate);
              
              return (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={item.id}>
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
              { Date.now() < item.expiryDate ? (
                <div className="de_countdown">{timeLeft.hrs}h {timeLeft.minTxt}m {timeLeft.secTxt}s</div>
              ) : null
            }
                
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
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
                </div>
                </div>
                </div>
                </div>
              )
            })
              ) : (<>Skeleton!</>)
            }
            </Slider>
        </div>
        </div>
        </section>
      );
};

export default NewItems;
