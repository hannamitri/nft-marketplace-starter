import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExpCountdown from "../ExpCountdown";

const NewItems = () => {
  const [newitems, setNewitem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});
  const [expiryDate, setExpiryDate] = useState(null);

  useEffect(() => {
    async function feachNewitem() {
      const {data} = await axios.get(` https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`);
      setNewitem(data);
      setLoading(false);
      console.log(data);
      setExpiryDate(new Date(data.expiryDate).getTime());
      
    }
    feachNewitem();
  }, []);

  useEffect(() => {
    if(!loading) {
      const timer = setInterval(() => {
        setCountdowns((prev) =>{
          const updated = {};
          newitems.forEach((item) => {
            const current = prev[item.id] - 1000;
            updated[item.id] = current > 0 ? current : 0;
          });
          return updated;
        });
     }, 1000);
      return () => clearInterval(timer);
    }
  }, [loading, newitems]);


  const settings = {
    arrows: true,
    slidesToShow: 4,
    infinite: true,
    responsive: [
    {
      breakpoint: 1192, // screen width <= 996px
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768, // screen width <= 768px
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480, // screen width <= 480px
      settings: {
        slidesToShow: 1,
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
          <Slider {...settings}> 
            { loading
               ? new Array(10).fill(0).map((_, index) => (
                   <div style={{ padding: "10px", textAlign: "center" }} key={index}>
                    <Skeleton circle height={60} width={60} style={{ margin: "auto", marginBottom: 10 }} />
                     <i className="fa fa-check"></i>
                     <Skeleton height={250} style={{ marginBottom: 10 }} />
                     <Skeleton width={100} height={20} style={{ margin: "auto", marginBottom: 5 }} />
                     <Skeleton width={60} height={15} style={{ margin: "auto" }} />
                   </div>
                ))
             :  newitems.map(newitem => (
                 
                   <div className="nft__item" key={newitem.authorId}>
                      <div className="author_list_pp">
                       <Link to="/author" data-bs-toggle="tooltip" data-bs-placement="top" title="Creator: Monica Lucas">
                          <img className="lazy" src={newitem.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                     </div>
                       <div className="de_countdown">
                         {<ExpCountdown expiyDate={expiryDate} />}
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
                            <a href="" target="_blank" rel="noreferrer"><i className="fa fa-twitter fa-lg"></i></a>
                            <a href=""><i className="fa fa-envelope fa-lg"></i></a>
                          </div>
                       </div>
                     </div>
                     <Link to="/item-details">
                       <img src={newitem.nftImage} className="lazy nft__item_preview" alt="" />
                     </Link>
                   </div>
                   <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{newitem.title}</h4>
                     </Link>
                     <div className="nft__item_price">{newitem.price} ETH</div>
                     <div className="nft__item_like">
                       <i className="fa fa-heart"></i>
                       <span>{newitem.likes}</span>
                     </div>
                   </div>
                 
            </div>
          ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
