import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import $ from "jquery";
import ExpiryTimer from "../UI/ExpiryTimer";

window.jQuery = window.$ = $;

const NewItems = () => {
  const [newitems, setNewItems] = useState([]);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    

    fetchNewItems();
  }, []);

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

             <OwlCarousel
                      key={newitems.length}
                      className="owl-theme"
                      loop
                      margin={10}
                      nav
                      dots={false}
                      autoplay 
                      responsive={{
                        0: {
                          items: 1,
                        },
                        576: {
                          items: 2,
                        },
                        768: {
                          items: 3,
                        },
                        1200: {
                          items: 4,
                        },
                      }}
                      >
          {newitems.map((item) => (
            <div className="item" key={item.nftId}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={item.authorName}
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                  <ExpiryTimer expiryDate={item.expiryDate} />

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
                    <h4>{item.name}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart text-danger"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
                
              </div>
            </div>
           ))}
            </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
