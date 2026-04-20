import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthors() {
      const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
      setAuthors(data);
    setLoading(false); 
  }
    fetchAuthors();
    }, [])

  const options = {
    loop: true,
    margin: 10,
    dots : false,
    nav: true,
    responsive: {
    0:    { items: 1 },
    576:  { items: 2 },
    992:  { items: 3 },
    1200: { items: 4 },
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
          {loading ? <Skeleton width="100%" height="200px" borderRadius="10px" /> : (
          <OwlCarousel className="owl-theme" {...options}>
          {authors.map((author) => (
            <div className="item" key={author.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={author.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={author.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{author.title}</h4>
                  </Link>
                  <span>ERC-{author.code}</span>
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
