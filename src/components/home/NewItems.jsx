import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Timer from "../UI/Timer";

const NewItems = () => {
  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const { data } = await axios.get(
      ` https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setItemsData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

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

          <OwlCarousel
            className="owl-theme"
            items={4}
            loop
            margin={10}
            nav
            dots={false}
            responsive={{
              0: { items: 1 },
              500: { items: 2 },
              768: { items: 3 },
              1000: { items: 4 },
            }}
          >
          {loading && itemsData.length === 0
            ? new Array(4).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft__item">
                    <div >
                      <Skeleton width={"50px"} height={"50px"} borderRadius={"25%"} />
                    </div>
                    <div >
                      <Skeleton width={"229px"} height={"229px"} borderRadius={"5px"} />
                    </div>
                    <div className="nft__item_info">
                      <div className="">
                        <Skeleton width={"229px"} height={"18px"} borderRadius={"5px"} />
                      </div>
                      <div>
                        <Skeleton width={"229px"} height={"26px"} borderRadius={"5px"} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : itemsData.map((item) => (
                <div key={item.id}>
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

                    <Timer nftInfo={item.expiryDate}/>
                    

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
        </div>
      </div>
    </section>
  );
};

export default NewItems;
