import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../css/styles/owl.carousel.css";
import CountdownTimer from "../UI/CountdownTimer";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewItems()
  }, []);

  async function fetchNewItems() {
    try {
      const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  const options = {
    loop: true,
    nav: true,
    items: 4,
    dots: false,
    margin: 5,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
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
          {loading ? (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton height={50} width={50} borderRadius={100} />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft__item_wrap">
                  <Link to="/item-details">
                    <Skeleton height={350} width={"100%"} />
                  </Link>
                  </div>
                  <div className="skeleton__box">

                    <div className="nft__item_info">
                      <h4><Skeleton height={20} width={180} /></h4>
                      <div className="nft__item_price"><Skeleton height={20} width={100} /></div>
                      <div className="nft__item_like">
                        <Skeleton height={15} width={30} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <OwlCarousel {...options}>
              {items.map((item, index) => (
                <div className="item" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.id}`}
                      >
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt={`${item.creator} profile`}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && (
                      <div className="de_countdown">
                        <CountdownTimer expiryDate={item.expiryDate} />
                      </div>
                    )}
                    <div className="nft__item_wrap">
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
    </section>
  );
};

export default NewItems;
