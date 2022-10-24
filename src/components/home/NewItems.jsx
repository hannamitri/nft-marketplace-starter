import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import OwlCarousel from 'react-owl-carousel';
import NewItem from "./NewItem";
import Skeleton from "../UI/Skeleton"


const NewItems = () => {
  const [newItems, setNewItems] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
      setNewItems(data);
    }
    getData();
  }, [])

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-in">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {
            newItems.length ? (
              <OwlCarousel
                margin={10} 
                loop
                nav={true}
                responsive={{
                  0: {
                    items: 1
                  },
                  480: {
                    items: 2
                  },
                  1000: {
                    items: 3
                  },
                  1200: {
                    items: 4
                  }
                }}
              >
              
                {
                  newItems.map((item) => (
                    <NewItem item={item}  key={item.id} />
                  ))
                }
              </OwlCarousel>
            ) : (
              <>
                <OwlCarousel
                  margin={10} 
                  loop
                  nav={true}
                  responsive={{
                    0: {
                      items: 1
                    },
                    480: {
                      items: 2
                    },
                    1000: {
                      items: 3
                    },
                    1200: {
                      items: 4
                    }
                  }}
                >
                  {
                    new Array(6).fill(0).map((_, index) => (
                      <Skeleton key={index} />
                    ))
                  }
                </OwlCarousel>
              </>
            )
          }
          {/* {new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={AuthorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">5h 30m 32s</div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a
                          href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a
                          href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/item-details">
                    <img
                      src={nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>Pinky Ocean</h4>
                  </Link>
                  <div className="nft__item_price">3.08 ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>69</span>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default NewItems;