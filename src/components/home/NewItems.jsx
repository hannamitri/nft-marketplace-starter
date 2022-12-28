import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';


function NewItems() {
  const [newItems, setNewItems] = useState(
    JSON.parse(localStorage.getItem("newItems")) || []
  )
  const [loading, setLoading] = useState()

  useEffect(() => {
    async function fetchNewItems() {
      setLoading(true)
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`);
      setNewItems(data);
      setLoading(false)
    }
    fetchNewItems();
  }, []);

  useEffect(() => {
    localStorage.setItem("newItems", JSON.stringify(newItems));
  }, [newItems]);

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
          {
            loading ? (
              <div className="nft__item">
                <div className="author_list_pp">
                  <div className="nft__item_wrap">
                    <div className="skeleton-box"></div>
                  </div>
                </div>
              </div>
            ) : (
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                nav
                items={4}
              >
                {newItems.map((newItem, index) => (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <Link
                        to={newItem.authorId}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={newItem.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
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

                      <Link to="/item-details">
                        <img
                          src={newItem.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{newItem.title}</h4>
                      </Link>
                      <div className="nft__item_price">{newItem.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{newItem.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default NewItems;
