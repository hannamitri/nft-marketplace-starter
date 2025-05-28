import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

const HotCollections = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setPost(data);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    fetchData();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            new Array(4).fill(0).map((element) => (
                <div className="nft__coll--skeleton">
                  <div className="nft__wrap--skeleton">
                    <div className="nft__wrap--img--skeleton"></div>
                    <div className="nft__coll--pp--skeleton"></div>
                    <div className="nft__coll--name--skeleton"></div>
                    <div className="nft__coll--code--skeleton"></div>
                  </div>
                </div>
            ))
          ) : (
            <>
              <Slider {...settings}>
                {post.map((posts) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={posts.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={posts.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{posts.title}</h4>
                        </Link>
                        <span>ERC-{posts.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
