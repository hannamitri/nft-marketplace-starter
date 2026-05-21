// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
const defaultNewItems = [
  {
    id: 1,
    authorId: 1,
    nftId: 101,
    authorImage: "https://example.com/author1.jpg",
    title: "Sample NFT 1",
    price: "0.5",
    likes: 12,
    expiryDate: "2026-05-20T23:59:59",
  },
  {
    id: 2,
    authorId: 2,
    authorImage: "https://example.com/author2.jpg",
    nftImage: "https://example.com/nft2.jpg",
    title: "Sample NFT 2",
    price: "1.2",
    likes: 45,
    expiryDate: "2026-05-21T23:59:59",
  },
];

const getRemainTime = (expiryDate) => {
  const expiry = new Date(expiryDate).getTime();
  const now = new Date().getTime();
  const total = expiry - now;

  if (isNaN(expiry) || total <= 0) {
    return "Expired";
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));


  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  return `${hours}h #{minutes}m ${seconds}s`;
};

const NewItems = () => {
  const [newItems, setNewItems] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );
        setNewItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };
    fetchNewItems();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
    },
  };

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

          <div className="col-lg-12">
            {loading ? (
              <div className="d-flex">
                {[1, 2, 3, 4].map((num) => (
                  <div className="col-lg-3 col-md-6 col-xs-12" key={num}>
                    <div className="nft_item">
                      <div className="author_list_pp">
                        <div
                          style={{
                            width: "50px",
                            height: "240px",
                            background: "#e0e0e0",
                            borderRadius: "50%",
                          }}
                        ></div>
                      </div>
                      <div className="nft_item_wrap">
                        <div
                          style={{
                            width: "100%",
                            height: "240px",
                            background: "#e0e0e0",
                            borderRadius: "8px",
                          }}
                        ></div>
                      </div>
                      <div
                        className="nft_item_info"
                        style={{ marginTop: "15px" }}
                      >
                        <div
                          style={{
                            width: "70%",
                            height: "20px",
                            background: "#e0e0e0",
                            marginBottom: "10px",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "40%",
                            height: "15px",
                            background: "#e0e0e0",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <OwlCarousel className="owl-theme" {...options}>
                {newItems.map((item) => (
                  <div className="item" key={item.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Profile"
                        >
                          <img
                            className="lazy"
                            src={item.authorImage}
                            alt="Author"
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div
                        className="de_countdown"
                        title={`Auction ends: ${new Date(item.expiryDate).toLocaleString()}`}
                      >
                        {item.expiryDate
                          ? getRemainTime(item.expiryDate)
                          : "Expired"}
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

                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview img-fluid"
                            alt={item.title}
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
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
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
