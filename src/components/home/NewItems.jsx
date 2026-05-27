import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import Skeleton from "../UI/Skeleton";
import TimeLeft from "../UI/TimeLeft";
import NftCard from "../NftCard";


function experationData(date) {
  const totalTimeLeft = date - Date.now();
  
  if (totalTimeLeft <= 0) return;

  const totalSeconds = Math.floor(totalTimeLeft / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s` 
}


const NewItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  },[])

    function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          fontSize: "40px",
          color: "black",
          right: "-16px",
          border: 'solid rgba(0, 0, 0, 0.2) 1px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'white'
        }}
        onClick={onClick}
      >
        ➜
      </div>
    );
  };

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          fontSize: "40px",
          color: "black",
          left: "-16px",
          top: '42%',
          transform: "rotate(180deg)",
          border: 'solid rgba(0, 0, 0, 0.2) 1px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'white',
          zIndex: '1'
        }}
        onClick={onClick}
      >
        ➜
      </div>
    );
  };
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
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
          {loading ? (
            <Slider {...settings}>
            {new Array(4).fill(0).map((_, index) => (
              <div className="p-2" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      {/* <i className="fa fa-check"></i> */}
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
                      <Skeleton width="100%" height="100%" borderRadius="12px"/>
                  </div>
                  <div className="nft__item_info">
                      <Skeleton width="100%" height="18px"/>
                    <div className="nft__item_price"><Skeleton width="100%" height="18px"/></div>
                    <div className="nft__item_like">
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </Slider>
          ) : (
            <Slider {...settings}>
              {data.map((item) => (
                <NftCard item={item}/>
              ))}
            </Slider> 
          )}

        </div>
      </div>
    </section>
  );
};

export default NewItems;

