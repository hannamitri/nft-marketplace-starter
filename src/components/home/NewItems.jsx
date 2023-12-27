import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ItemsCard from "../ItemsCard";
import Skeleton from "../Skeleton";

const NewItems = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getItems() {
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
    setUsers(data)
  }

  useEffect(() => {
    getItems()
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
        margin: 10,
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
          {loading ? (
            new Array(7).fill(0).map((_, index) => (
              <div key={index} >
                <div className="nft__item">
                  <div className="author_list_pp">
                  <div className="skeleton-box"
                   style={{width: "50px", height: "50px", borderRadius: "50px"}}>
                  </div>
                      <i className="fa fa-check"></i>
                  </div>
  
                  <div className="nft__item_wrap">
                       <div className="skeleton-box"
                         style={{width: "100%", height: "200px", borderRadius: "10px"}}>
                       </div>
                  </div>
                  <div className="nft__item_info">
                  <div className="skeleton-box"
                   style={{width: "200px", height: "20px", borderRadius: "5px"}}>
                  </div>
                    <div className="nft__item_price">
                    <div className="skeleton-box"
                   style={{width: "100px", height: "20px", borderRadius: "5px"}}>
                  </div>
                    </div>
                    <div className="nft__item_like">
                      <div className="skeleton-box"
                   style={{width: "20px", height: "20px", borderRadius: "50px"}}>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            users.map((user) => (
              <div key={user.id} >
                <ItemsCard Itemcard={user} />
              </div>
            )))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
