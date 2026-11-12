import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Slider from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import axios from "axios";
import NewItem from "../UI/NftCard";
import AOS from 'aos';

const NewItems = () => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
    AOS.init();
  }, []);

  return (
    <section id="section-items" className="no-bottom" data-aos="fade-up" data-aos-duration="1500">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div className="skeleton-container">
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    width="100%"
                    height="150px"
                    borderRadius="8px"
                  />
                ))}
            </div>
          ) : (
            <Slider
              className="owl-theme"
              loop
              nav
              dots={false}
              margin={8}
              responsive={{
                0: { items: 1 },
                572: { items: 2 },
                992: { items: 3 },
                1200: { items: 4 },
              }}
            >
              {!loading &&
                items.map((item) => (
                  <div
                    key={item.id} // Only on the outer div
                    style={{ width: "100%", maxWidth: "100%", padding: "0" }}
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  >
                    {/* <div className="nft__item">
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
        <div className="de_countdown">
          {/* Countdown logic can go here 
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
          <Link to={`/item-details/${item.id}`}>
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to={`/item-details/${item.id}`}>
            <h4>{item.title}</h4>
          </Link>
          <div className="nft__item_price">{item.price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>69</span>
          </div>
        </div>
      </div> */}
                    <NewItem item={item} />
                  </div>
                ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
