import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import NFTExpiration from "./NFTExpiration";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState();


  
  const options = {
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 1,
      },
      800: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },

    dots: false,
    items: 4,
    nav: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
      );

      setNewItems(data);
      setLoading(false);
    };

    fetchData();
  }, []);


  // window.addEventListener('beforeunload', () => {
  //   sessionStorage.setItem('scrollPosition', window.scrollY);
  // });
  
  // // Restore the scroll position after refresh
  // window.addEventListener('load', () => {
  //   if (sessionStorage.getItem('scrollPosition')) {
  //     window.scrollTo(0, sessionStorage.getItem('scrollPosition'));
  //     sessionStorage.removeItem('scrollPosition');
  //   }
  // });
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  });
  
  // Restore the scroll position after refresh
  window.addEventListener('load', () => {
    if (sessionStorage.getItem('scrollPosition')) {
      window.scrollTo(0, sessionStorage.getItem('scrollPosition'));
      sessionStorage.removeItem('scrollPosition');
    }
  });

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
            <div className="horizontal_divItems">
              <button class="btn__left--skeleton">&lt;</button>
              {new Array(4).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <img className="lazy" alt="" />
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft__item_wrap--skeleton">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <div className="nft__item_share"></div>
                        </div>
                      </div>

                      <img src="" className="lazy nft__item_preview" alt="" />
                    </div>
                    <div className="nft__item_info--skeleton">
                      <div className="nft__item_info--skeleton--title" />

                      <div className="nft__item_price--skeleton" />
                      <div className="nft__item_like--skeleton" />
                    </div>
                  </div>
                </div>
              ))}
              <button class="btn__right--skeleton">&gt;</button>
            </div>
          ) : (
            <OwlCarousel
              className="owl-theme owl-nav"
              loop
              margin={10}
              {...options}
            >
              {newItems.map((newItem) => (
                <div
                  className="owl-carousel owl-loaded owl-drag"
                  key={newItem.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      
                      <Link
                      to={{ pathname: `/author/${newItem.authorId}`, state: newItem.authorId}}
                     
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img
                          className="lazy"
                          src={newItem.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {newItem.expiryDate != null ? (
                      <div className="de_countdown">
                        {" "}
                        <NFTExpiration nftObject={newItem} />
                      </div>
                    ) : (
                      <></>
                    )}
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

                      <Link to={{ pathname: `/item-details/${newItem.nftId}`, state: newItem.nftId}} >
                        <img
                          src={newItem.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details/">
                        <h4>{newItem.title}</h4>
                      </Link>
                      <div className="nft__item_price">{newItem.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{newItem.likes}</span>
                      </div>
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
