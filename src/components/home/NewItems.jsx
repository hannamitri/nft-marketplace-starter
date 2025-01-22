import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";
import Aos from 'aos';
import 'aos/dist/aos.css';

const NewItems = ({ width, height, borderRadius }) => {

  useEffect(() => {
      Aos.init({
        easing: 'ease-in-out',
        duration: 1000,
      });
    }, [])


  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching new items:", error);
        setError("Failed to load items. Please try again later.");
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 1000);

    fetchData();

    return () => clearTimeout(timer);
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 }
    }
  };

  if (error) {
    return (
      <div className="container">
        <div className="text-center py-4 text-red-600">{error}</div>
      </div>
    );
  }



  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos = "fade" data-aos-delay = "100" data-aot-duration = "200">New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="owl-theme" {...options} data-aos = "fade" data-aos-delay = "100" data-aot-duration = "200">
            {newItems.map((item, index) => {
              return (
                <div className="item" key={index} data-aos = "fade" data-aos-delay = "" data-aot-duration = "200">
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        {isLoading ? (
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        ) : (
                          <>
                            <img 
                              className="lazy" 
                              src={item ? item.authorImage : ''} 
                              alt={`Creator: ${item ? item.author : 'Unknown'}`}
                            />
                            <i className="fa fa-check"></i>
                          </>
                        )}
                      </Link>
                    </div>
                    {item.expiryDate ? <Countdown expiryDate={item.expiryDate} /> : null}
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
                        {isLoading ? (
                          <Skeleton width="100%" height="200px" borderRadius={borderRadius} />
                        ) : (
                          <img
                            src={item ? item.nftImage : ''}
                            className="lazy nft__item_preview"
                            alt={item ? item.title : 'NFT Item'}
                          />
                        )}
                      </Link>
                    </div>
                    <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      
                        {isLoading ? (
                          <Skeleton width="80%" height="24px" borderRadius={borderRadius} />
                        ) : (
                          <h4>{item ? item.title : ''}</h4>
                        )}
                      </Link>
                      {isLoading ? (
                        <Skeleton width="60%" height="20px" borderRadius={borderRadius} />
                      ) : (
                        <div className="nft__item_price">{item ? item.price : ''} ETH</div>
                      )}
                      {isLoading ? (
                        <Skeleton width="40%" height="20px" borderRadius={borderRadius} />
                      ) : (
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item ? item.likes : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;