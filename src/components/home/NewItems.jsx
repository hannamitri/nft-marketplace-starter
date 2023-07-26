import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faUpLong } from "@fortawesome/free-solid-svg-icons";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";


const NewItems = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getData(){
      const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      setData(response.data)
      setLoading(true)
    }
    getData()
  },[])
    
    const slider = React.useRef(null);

  const settings = {
    infinite: true,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,        
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
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
          <div className="relative p-1">
          {loading ? 
          <>
          <FontAwesomeIcon icon={faAngleLeft} className="hover:scale-110 transition-transform rounded-full w-4 h-4 p-2 left-0 border-black border-1 absolute top-[50%] bg-white" onClick={() => slider?.current?.slickPrev()} />
          <Slider {...settings}  ref={slider}> 
          {data.map((data) => (
            <div className="px-2 sm:px-1" key={data.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${data.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={data.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {data.expiryDate !== null ? <Countdown time={data.expiryDate} /> : <></>}
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
                  <Link to="/item-details">
                    <h4>{data.title}</h4>
                  </Link>
                  <div className="nft__item_price">{data.price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{data.likes}</span>
                  </div>
                </div>
              </div>
            </div> 
          ))}
          </Slider>
          <FontAwesomeIcon icon={faAngleRight} className="hover:scale-110 transition-transform p-2 rounded-full w-4 h-4 border-black border-1 absolute right-0 top-[50%] bg-white" onClick={() => slider?.current?.slickNext()} />
          </>
          : 
          <>
          <Slider {...settings}>
            {new Array(4).fill(0).map((_, index) => (
            <div className="px-2 sm:px-1" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width={50} height={50} borderRadius={9999} />
                </div>
                <div className="absolute right-5 ">
                <Skeleton width={60} height={14} borderRadius={10} />
                </div>
                <div className="nft__item_wrap">
                  <Skeleton width="100%" height={230} borderRadius={10} />
                </div>
                <div className="nft__item_info">
                  <Skeleton width={100} height={14} borderRadius={10} />
                  <div className="nft__item_price">
                  <Skeleton width={60} height={14} borderRadius={10} />
                  </div>
                  <div className="nft__item_like">
                  <Skeleton width={40} height={14} borderRadius={10} />
                  </div>
                </div>
              </div>
            </div>
            ))}
            </Slider>
          </>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
