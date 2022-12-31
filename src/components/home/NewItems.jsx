import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import CountdownTimer from "./CountDownTimer";
import Skeleton from "../UI/Skeleton";

const NewItems = ({ setAuthorId }) => {
  const baseUrl =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    axios.get(`${baseUrl}`).then((res) => {
      setPost(res.data);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
          <OwlCarousel className="slider-items owl-carousel" {...options}>
            {!loading ? (
              <Skeleton itemNo={4} />
            ) : (
              post?.map((post, index) => (
                <div className="" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`author/${post.authorId}`}
                        onClick={() => setAuthorId(post.authorId)}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={post.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {post?.expiryDate ? (
                      <CountdownTimer targetDate={post.expiryDate} />
                    ) : (
                      ""
                    )}

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

                      <Link to={`/item-details/${post.nftId}`}>
                        <img
                          src={post.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${post.nftId}`}>
                        <h4>{post.title}</h4>
                      </Link>
                      <div className="nft__item_price">
                        {post.price} ETH{" "}
                        <i className="fa-brands fa-ethereum"></i>
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;