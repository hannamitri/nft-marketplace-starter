import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function Carosuel() {
  const [posts, nftPost] = useState([]);

  async function fetchAuthorData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    nftPost(data);
  }

  useEffect(() => {
    fetchAuthorData();
  }, []);



  const responsiveOptions = {
    0: { items: 1 },    // For screens smaller than 576px, show 1 item per slide
    768: { items: 2 },  // For screens larger than 768px, show 2 items per slide
    992: { items: 3 },  // For screens larger than 992px, show 3 items per slide
    1200: { items: 4 },  // For screens larger than 1200px, show 4 items per slide
  };


  return (
    <OwlCarousel
      className="owl-theme owl-drag owl-loaded "
      dots={false}
      loop
      margin={10}
      nav
      responsive={responsiveOptions}
      >
    
      {posts.map((post) => (
  
          <div className="nft_coll" key={post.id}>
            <div className="nft_wrap">
              <Link to={`/item-details/${post.nftId}`}>
                <img src={post.nftImage} className="lazy img-fluid" alt="" />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to={`/author/${post.authorId}`}>
                <img className="lazy pp-coll" src={post.authorImage} alt="" />
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

      ))}
    
    </OwlCarousel>
  );
}
