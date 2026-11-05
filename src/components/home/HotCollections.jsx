import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ReactOwlCarousel from "react-owl-carousel";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      .then((response) => {
        setData(response.data); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
            <ReactOwlCarousel
  className="owl-theme"
  loop
  margin={10}
  nav
  responsive={{
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 4 },
  }}
>
  {data.map((item) => (
    <div className="nft_coll" key={item.id}>
      <div className="nft_wrap">
        <Link to="/item-details">
          <img
            src={item.nftImage}
            className="img-fluid"
            alt={item.title}
          />
        </Link>
      </div>
      <Skeleton />
      <div className="nft_coll_pp">
        <Link to="/author">
          <img
            className="pp-coll"
            src={item.authorImage}
            alt="Collection creator"
          />
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
  ))}
</ReactOwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
