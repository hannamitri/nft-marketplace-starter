import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const HotCollections = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  async function getData() {
    const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
    const results = response.data
    setItems(results)
  }
  useEffect(() => {
    getData()
  }, [])

  setTimeout(() => {
    setLoading(false)
  }, 3000);
  
  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        initialSlide: 0,
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
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
 
  

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {loading ? (
              new Array(4).fill(0).map((_, index) => (
                <div className="nft_coll" key={index}>
            <div className="nft_wrap">
              <div className="skeleton-box"
                style={{width: "100%", height: "200px"}}>
              </div>
            </div>
            <div className="nft_coll_pp">
              <div className="skeleton-box"
                style={{width: "50px", height: "50px"}}>
              </div>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <div className="skeleton-box"
                style={{width: "100px", height: "20px"}}>
              </div>
              <br />
              <div className="skeleton-box"
                style={{width: "60px", height: "20px"}}>
              </div>
            </div>
          </div>
              ))) : (

                items.map((item, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img src={`${item.nftImage}`} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img className="lazy pp-coll" src={`${item.authorImage}`} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{`${item.title}`}</h4>
                        </Link>
                        <span>ERC-{`${item.code}`}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
