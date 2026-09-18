import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
      )
      .then((response) => {
        console.log(response.data);
        setCollections(response.data);
      })
      .catch((error) => {
        console.error("Error fetching collections:", error);
      });
  }, []);

const options = {
  loop: true,
  margin: 30,
  nav: true,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
  },
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

      {collections.length > 0 && (
  <OwlCarousel
    className="owl-theme"
    {...options}
  >
    {collections.map((collection) => (
  <div className="item" key={collection.id}>
    <div className="nft_coll">

      <div className="nft_wrap">
        <Link to={`/item-details/${collection.id}`}>
          <img
            src={collection.nftImage}
            className="lazy img-fluid"
            alt={collection.title}
          />
        </Link>
      </div>

      <div className="nft_coll_pp">
        <Link to="/author">
          <img
            className="lazy pp-coll"
            src={collection.authorImage}
            alt={collection.title}
          />
        </Link>
        <i className="fa fa-check"></i>
      </div>

      <div className="nft_coll_info">
        <Link to={`/item-details/${collection.id}`}>
          <h4>{collection.title}</h4>
        </Link>

        <span>ERC-{collection.code}</span>
      </div>

    </div>
  </div>
))}
  </OwlCarousel>
)}

      </div>
    </div>
  </section>
);
};

export default HotCollections;
