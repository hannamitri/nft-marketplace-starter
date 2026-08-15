import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const settings = {
  dots: false,
  nav: true,
  loop: true,
  margin: 20,
  items: 4,
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    992: {
      items: 4,
    },
  },
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        nicole_hotcollections
        console.log(data);
         main
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch new items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);
 nicole_hotcollections

  if (loading) return <div>Loading...</div>;
  main
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
          <OwlCarousel className="owl-theme" {...settings}>
                    
{items.map((item) => (
  <div className="nft__item" key={item.id}>
    <div className="author_list_pp">
 nicole_hotcollections
      <Link to="/author" data-bs-toggle="tooltip" data-bs-placement="top" title={`Creator: ${item.author || 'Unknown'}`}>

      <Link
  to="/author"
  data-bs-toggle="tooltip"
  data-bs-placement="top"
  title={`Creator ID: ${item.authorId}`}
  main
        <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
        <i className="fa fa-check"></i>
      </Link>
    </div>
 nicole_hotcollections

    {item.expiration && <div className="de_countdown">{item.expiration}</div>}


{item.expiryDate && (
  <div className="de_countdown">
    <Countdown date={item.expiryDate} />
  </div>
)}
main
    <div className="nft__item_wrap">
      <Link to="/item-details">
        <img src={item.nftImage || nftImage} className="lazy nft__item_preview" alt="" />
      </Link>
    </div>

    <div className="nft__item_info">
      <Link to="/item-details">
        <h4>{item.title || 'Untitled'}</h4>
      </Link>
      <div className="nft__item_price">{item.price ? `${item.price} ETH` : '—'}</div>
      <div className="nft__item_like">
        <i className="fa fa-heart"></i>
        <span>{item.likes || 0}</span>
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