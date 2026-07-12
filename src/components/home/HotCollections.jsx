import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Skeleton from "../UI/Skeleton";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 4 },
  desktop: { breakpoint: { max: 1200, min: 900 }, items: 3 },
  tablet: { breakpoint: { max: 900, min: 600 }, items: 2 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => {
        setCollections(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12" data-aos="fade-right" data-aos-delay="100">
            <Carousel responsive={responsive} infinite={true} autoPlay={false} keyBoardControl={true} transitionDuration={500} containerClass="carousel-container" itemClass="px-2">
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <div key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width="100%" height="200px" borderRadius="10px" />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        </div>
                        <div className="nft_coll_info">
                          <Skeleton width="80%" height="20px" borderRadius="5px" />
                          <br />
                          <Skeleton width="50%" height="15px" borderRadius="5px" />
                        </div>
                      </div>
                    </div>
                  ))
                : collections.map((item) => (
                <div key={item.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img src={item.nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img className="lazy pp-coll" src={item.authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
