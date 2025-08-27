import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import CountdownTimer from "../UI/CountdownTimer";
import Skeleton from "../UI/SkeletonCard";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewItems = () => {
  const [items, setItems] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching new items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <section className="container">
      <div className="text-center mb-3">
        <h2>New Items</h2>
        <div className="small-border"></div>
      </div>

      <Slider {...settings}>
        {items.length === 0
          ? new Array(4).fill(0).map((_, i) => <Skeleton key={i} />)
          : items.map((item) => (
              <div key={item.id} className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img
                      className="lazy"
                      src={item.authorImage}
                      alt={item.title}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <div className="nft__item_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy img-fluid"
                      alt={item.title}
                    />
                  </Link>
                </div>

                <CountdownTimer expiryDate={item.expiryDate} />

                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__price">{item.price} ETH</div>
                  <div className="nft__item_action">
                    <span>Buy Now</span>
                  </div>
                </div>
              </div>
            ))}
      </Slider>
    </section>
  );
};

export default NewItems;
