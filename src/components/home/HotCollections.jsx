import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';



const HotCollections = () => {
  const baseUrl = "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${baseUrl}`).then((res) => {
      setPost(res.data);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    autoplay: true,
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

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row ">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="slider-items owl-carousel" {...options}>
            {!loading
              ? new Array(6).fill(0).map((_, index) => (
                  <div className="" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap_loading"></div>
                      <div className="nft_coll_pp_loading">
                        <Link to="/author">
                          <div className="pp-coll_loading" alt=""></div>
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info-loading">
                        <div className="nft_coll_info-title-loading"></div>
                        <div className="nft_coll_info-description-loading"></div>
                      </div>
                    </div>
                  </div>
                ))
              : post?.map((post, index) => (
                  <div className=" " key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap ">
                        <Link to={`/items-details/${post.nftId}`}>
                          <img
                            src={post.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${post.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={post.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{post.title}</h4>
                        </Link>
                        <span>ERC-{post.code}</span>
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
export default HotCollections
