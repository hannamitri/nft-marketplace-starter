import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import CountdownTimer from "../UI/CountdownTimer";
import Skeleton from "../UI/Skeleton";


const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const NewItems = () => {
  const [itemsSection, setItemsSection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(API_URL);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setItemsSection(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 3 },
      1200: { items: 4 },
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
            <OwlCarousel key='skeleton' className="owl-theme" {...options}>
              {new Array(4).fill(0).map((_, index) => (
                <div key={index}>
                  <Skeleton/>
                </div>             
              ))}
            </OwlCarousel>

          ) : (
            
            itemsSection.length > 0 && (
              <OwlCarousel key='real' className="owl-theme" {...options}>
                {itemsSection.map((item) => (
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
                      {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate}/>}

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

                        <Link to="/item-details">
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
                  
                ))}
              </OwlCarousel>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;

{/* <div style={{ display: "flex", gap: "10px" }}></div> */}