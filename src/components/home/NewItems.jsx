import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import CountdownTimer from "./CountDownTimer";

const NewItems = () => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  async function getItems() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
    setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    getItems()
  }, [])


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

          <Carousel responsive={responsive} infinite={true}>
          { 

          loading ? (
            new Array(4).fill(0).map((_, index) => (
              <div className="carousel__item" key={index}>
                <div className="nft__item">
                  <div className="header__img skeleton">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
             
                    >
                      <img className="" alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown skeleton">??h ??m ??s</div>
  
                  <div className="nft__item_wrap skeleton">
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
                        className="skeleton"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4 className="skeleton skeleton__text--title"></h4>
                    </Link>
                    <div className="nft__item_price skeleton skeleton__text"></div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span className="skeleton skeleton__text"></span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            items.map((item, index) => { 
              return (
                <div className="carousel__item" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item?.expiryDate ? (
                        <CountdownTimer targetDate={item.expiryDate} />
                      ) : (
                        ""
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
                </div>
            )})
          )
          }
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
