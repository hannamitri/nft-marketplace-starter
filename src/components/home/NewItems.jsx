import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import NewItemSkeleton from "../UI/NewItemSkeleton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import CountdownTimer from "../home/CountdownTimer.jsx"

const NewItems = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState (true);

  const [sliderRef, slider] = useKeenSlider({
  loop: true,
  mode: "snap",

  slides: {
    perView: 4,
    spacing: 15,
  },

  breakpoints: {
    "(max-width: 1200px)": {
      slides: { perView: 3 }
    },
    "(max-width: 768px)": {
      slides: { perView: 2 }
    },
    "(max-width: 480px)": {
      slides: { perView: 1 }
    }
  }
});

  useEffect(() => {
    async function getItems() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getItems();
  }, []);

  useEffect(() => {
    if (!loading && slider.current) {
      slider.current.update();
    }
  }, [loading, slider]);


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
          <div className="carousel-wrapper">
            <button className="carousel-arrow left"
              onClick={() => slider.current?.prev()}>❮</button>
            <div ref={sliderRef} className="keen-slider">
              {loading ? new Array(4).fill(0).map((_, index) => (
                <div className="keen-slider__slide" key={index}>
                  <NewItemSkeleton />
                  </div>
                )) : 
                items.map(item => (
                  <div className="keen-slider__slide" key={item.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {item.expiryDate > Date.now() && (
                        <div className="de_countdown">
                        <CountdownTimer endTime={item.expiryDate} />
                      </div>
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

                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <button className="carousel-arrow right"
              onClick={() => slider.current?.next()}>❯</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
