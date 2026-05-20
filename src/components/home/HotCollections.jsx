import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const carouselOptions = {
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive: {
    0: { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    1200: { items: 4 },
  },
};

const SkeletonCard = () => (
  <div className="nft_coll">
    <div className="nft_wrap">
      <Skeleton width="100%" height="200px" borderRadius="10px 10px 0 0" />
    </div>
    <div className="nft_coll_pp">
      <Skeleton width="60px" height="60px" borderRadius="50%" />
    </div>
    <div className="nft_coll_info">
      <Skeleton width="120px" height="18px" borderRadius="4px" />
      <br />
      <Skeleton width="70px" height="14px" borderRadius="4px" />
    </div>
  </div>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((r) => r.json())
      .then((data) => {
        setCollections(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const items = loading
    ? new Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
    : collections.map((item) => (
        <div className="nft_coll" key={item.id}>
          <div className="nft_wrap">
            <Link to={`/item-details?nftId=${item.nftId}`}>
              <img src={item.nftImage} className="lazy img-fluid" alt={item.title} />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to={`/author?author=${item.authorId}`}>
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
      ));

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
          <div className="col-lg-12" data-aos="fade-up">
            <OwlCarousel className="owl-theme" {...carouselOptions}>
              {items}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
