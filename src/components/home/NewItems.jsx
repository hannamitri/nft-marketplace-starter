import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import CountdownTimer from "./CountDownTimer";
import SkeletonCard from "../UI/SkeletonCard";

const NewItems = () => {

  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    autoplay: false,
    navText: ["<", ">"],
    smartSpeed: 600,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
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
    setTimeout(() => {
      setLoading(true)
    }, 1000)
  }, [])


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row" data-aos='fade-in' data-aos-duration="1000">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <ReactOwlCarousel {...options}>
          { 
          loading ? (
          <SkeletonCard itemNo={4} className={""}/>
          ) : (
            items.map((item, index) => { 
              return (
                <div className="carousel__item" key={index}>
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
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
            )})
          )
          }
          </ReactOwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
