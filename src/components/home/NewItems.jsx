import React, { useEffect, useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";
import CountDown from "../CountDown";

const NewItems = ({item}) => {
  const [newItems, setNewItems] = useState()
  const [isLoading, setIsLoading] = useState(false)

  let timeLeft;
  let cancelId;
  const [secondsText, setSecondsText] = useState();
  const [minutesText, setMinutesText] = useState();
  const [hoursText, setHoursText] = useState();

  useEffect(() => {
    start();
    getnewItems()
    return () => { cancelAnimationFrame(cancelId) }
  }, [])

  function start() {
    cancelId = requestAnimationFrame(update)
  }

  function update() {
    timeLeft = (item.expiryDate - Date.now());
    let seconds = Math.floor(timeLeft / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)

    if(timeLeft < 0) {
      cancelAnimationFrame(cancelId);
      return;
    }

    setSecondsText(seconds % 60);
    setMinutesText(minutes % 60);
    setHoursText(hours);
    
    cancelId = requestAnimationFrame(update)
  }

  const getnewItems = async () => {
    await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`).then((res) => {
      setNewItems(res.data)
      setIsLoading(true)
    })
  }




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
          {isLoading ? (
              <OwlCarousel className="owl-theme" margin={10} 
                  loop
                  nav={true}
                  responsive={{
                    0: {
                      items: 1
                    },
                    768: {
                      items: 2
                    },
                    1000: {
                      items: 3
                    },
                    1200: {
                      items: 4
                    }
                  }}>
                {newItems?.map((item, index) => (
                <div className="nft__item" key={index}>
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
                <div className="de_countdown">{item.expiryDate}</div>

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
                  <div className="nft__item_price">{item.price}ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
              ))}
              </OwlCarousel>
          ) : (
            <>
            <OwlCarousel className="owl-theme" margin={10} 
            loop
            nav={true}
            responsive={{
              0: {
                items: 1
              },
              768: {
                items: 2
              },
              1000: {
                items: 3
              },
              1200: {
                items: 4
              }
            }}>
              {newItems?.map((item, index) => (
                <div className="nft__item" key={index}>
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
                {
                  secondsText > 0 && (
                  <div className="de_countdown">{hoursText}h {minutesText}m {secondsText}s</div>
                  )
                }
                

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
                  <div className="nft__item_price">{item.price}ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
              ))}
              <Skeleton
          width="50px"
          height="50px"
          borderRadius="50%" />
          </OwlCarousel>
            </>

          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
