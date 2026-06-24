import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios"; 
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/owl.carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(""); 
  
  useEffect(() => {
    if (!expiryDate) return; 

    const interval = setInterval(() => {
      const distance = expiryDate - new Date().getTime(); 

      const hours = Math.floor(distance / (1000 * 60 * 60));
      // Fixed parentheses math here to prevent NaN minutes
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        setTimeLeft("Expired");
        clearInterval(interval); 
      } else {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000); // Moved interval time tracking back inside the useEffect properly

    return () => clearInterval(interval);
  }, [expiryDate]); // Fixed the syntax error typo here [expiryDate].

  return <div className="de_countdown">{timeLeft}</div>;
};



// MAIN COMPONENT 

const NewItems = () => {
const [collections, setCollections] = useState([]);
const [loading, setLoading] = useState(true); 


 useEffect(() => {
    fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
    .then((response) => {
      if (!response.ok) {
          throw new Error('Network response processed an error. Please try again later');
        }
        return response.json();
      })
      .then((data) => {        
        setCollections(data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching the API:', error);
        setLoading(false);
      });
  }, []); 




const  newItemsOptions = {
  loop: true, 
  margin: 16, 
  nav: true, 
  dots: false, 
  navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],

  responsive: {
    0: { items: 1},
    576: { items: 2},
    768: { items: 3}, 
    1200: { items: 4}, 
  }
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
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft_item_skeleton">
                  <div className="skeleton-box" style={{ width: "100%", height: "250px" }}></div>
                  <div className="skeleton-box" style={{ width: "100px", height: "20px", marginTop: "10px" }}></div>
                  <div className="skeleton-box" style={{ width: "60px", height: "15px", marginTop: "5px" }}></div>
                </div>
              </div>
            ))
          ) : (
            <OwlCarousel className="owl-theme" {... newItemsOptions}>
              {collections.map((item) => (
                <div className="nft__item" key={item.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  
                  {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

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

                    <Link to={`/item-details/${item.nftId}`}>
                      <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                    </Link>
                  </div>
                  
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};




                

export default NewItems;
