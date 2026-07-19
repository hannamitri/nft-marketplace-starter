import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Card from "../UI/Card";


const carouselOptions = {
  className: "owl-theme",
  loop: true,
  nav: true,
  dots: false,
  margin: 8,
  navText: ["<", ">"],
  responsive: {
    0: { items: 1 },
    572: { items: 2 },
    992: { items: 3 },
    1200: { items: 4 },
  },
};

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewItems();
  }, []);

  async function fetchNewItems() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItems(data);
      setLoading(false);
    } catch {
      setLoading(false);
      console.error("There was an error fetching New Items");
    }
  }

  return (
    <>
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <OwlCarousel key={loading} {...carouselOptions}>
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <div className="nft__item" key={index}>
                      <div className="author_list_pp">
                        <div className="lazy skeleton newItems__authorImage--skeleton" />
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
                        <div className="lazy nft__item_preview skeleton newItems__img--skeleton" />
                      </div>
                      <div className="nft__item_info">
                        <h4 className="newItems__title--skeleton skeleton">
                          &nbsp;
                        </h4>
                        <div className="nft__item_price newItems__price--skeleton skeleton">
                          &nbsp;
                        </div>
                      </div>
                      <div className="nft__item_like newItems__like--skeleton skeleton"></div>
                    </div>
                  ))
                : 
                (newItems.map(
                    (item) => (
                      <Card key={item.nftId} {...item} />
                    )
                  ))    
                    }
            </OwlCarousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewItems;
