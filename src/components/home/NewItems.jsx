import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Skeleton from "../UI/Skeleton";
import CountdownTimer from "../UI/CountdownTimer";

const NewItems = () => {
const [items, setItems] = React.useState([]);
const [loading, setLoading] = React.useState(true);

const [sliderRef, instanceRef] = useKeenSlider({
  loop: true,
  slides: {
    perView: 4,
    spacing: 20,
  },
  breakpoints: {
    "(max-width: 992px)": {
      slides: {
        perView: 2,
        spacing: 16,
      },
    },
    "(max-width: 576px)": {
      slides: {
        perView: 1,
        spacing: 12,
      },
    },
  },
});

React.useEffect(() => {
  axios
    .get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    )
    .then((response) => {
      setItems(response.data);
    })
    .catch((error) => {
      console.error("Error fetching new items:", error);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);



React.useEffect(() => {
  instanceRef.current?.update();
}, [items, instanceRef]);

  return (
    <section id="section-items" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
            {loading ? (
  <div className="keen-slider">
    {new Array(4).fill(0).map((_, index) => (
      <div className="keen-slider__slide" key={index}>
        <div className="nft__item">
          <Skeleton
            width="100%"
            height="300px"
            borderRadius="8px"
          />

          <div className="nft__item_info">
            <Skeleton
              width="65%"
              height="22px"
              borderRadius="4px"
            />

            <div style={{ marginTop: "10px" }}>
              <Skeleton
                width="35%"
                height="16px"
                borderRadius="4px"
              />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div ref={sliderRef} className="keen-slider">
    {items.map((item) => (
      <div className="keen-slider__slide" key={item.id}>
        <div className="nft__item">
          <div className="author_list_pp">
            <Link to={`/author/${item.authorId}`}>
              <img
                className="lazy"
                src={item.authorImage}
                alt=""
              />
              <i className="fa fa-check"></i>
            </Link>
          </div>
           {item.expiryDate && item.expiryDate > Date.now() && (
          <CountdownTimer expiryDate={item.expiryDate} />
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
                alt={item.title}
              />
            </Link>
          </div>

          <div className="nft__item_info">
            <Link to={`/item-details/${item.nftId}`}>
              <h4>{item.title}</h4>
            </Link>

            <div className="nft__item_price">
              {item.price} ETH
            </div>

            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{item.likes}</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
