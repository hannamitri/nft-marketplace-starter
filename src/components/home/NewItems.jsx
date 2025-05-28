import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

const NewItems = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
 

  useEffect(() => {
    async function fetchPost() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
      );
      console.log(data);
      setPost(data);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
    fetchPost();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const getCountdown = (expiry) => {
    const diff = expiry - Date.now();
    if (diff <= 0) return "00:00:00";
    const h = String(Math.floor(diff  / 3600000)).padStart(2, "0")
    const m = String(Math.floor((diff  % 3600000) / 60000)).padStart(2, "0")
    const s = String(Math.floor((diff  % 60000) / 1000)).padStart(2, "0")
    return `${h}h ${m}m ${s}s`
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
          <Slider {...settings}>
            {post.map((posts) => (
              <>
                {loading ? (
                  <div className="skeleton">
                    <div className="item__wrap--skeleton">
                      <div className="pfp__skeleton">
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="countdown__skeleton"></div>
                      <div className="background__skeleton"></div>
                      <div className="title__skeleton"></div>
                      <div className="price-likes__skeleton"></div>
                    </div>
                  </div>
                ) : (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={posts.title}
                        >
                          <img
                            className="lazy"
                            src={posts.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown">{getCountdown(posts.expiryDate)}</div>

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
                            src={posts.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{posts.title}</h4>
                        </Link>
                        <div className="nft__item_price">{posts.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{posts.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
