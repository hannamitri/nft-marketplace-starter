import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../service/service";
import OwlCarousel from "react-owl-carousel";
import Timer from "../UI/Timer";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState();

  const getNewItems = async () => {
    try {
      const data = await Service.fetchNewItems();
      setLoading(false);
      setItems(data);
    } catch (error) {
      console.error("Error getting new items", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewItems();
  }, []);

  const settings = {
    loop: true,
    margin: 10,
    nav: true,
    items: 4,
    dots: false,
    responsive: {
      1200: { items: 4 },
      992: { items: 3 },
      768: { items: 2 },
      0: { items: 1 },
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
          {!loading && items.length > 0 ? (
            <OwlCarousel className="owl-carousel" {...settings}>
              {items.map((item) => (
                <div className="nft__item" key={item.id}>
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
                  {item.expiryDate != null && (
                    <div className="de_countdown">
                      <Timer duration={item.expiryDate} />
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
                      <span>69</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton width={60} height={60} borderRadius={9999} />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="100%" />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width={200} height={28} />

                    <div className="nft__item_price">
                      <Skeleton width={125} height={28} />
                    </div>
                    <div className="nft__item_like">
                      <Skeleton width={40} height={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
