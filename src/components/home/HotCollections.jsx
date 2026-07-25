import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollections = () => {
  const[hotCollections, setHotCollections] = useState([]);
  
  useEffect(() => {
    axios
    .get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      .then((response) => {
        console.log(response.data);
        setHotCollections(response.data);
      })
      .catch((error) => {
        console.error('Error fetching hot collections:', error);
      });
  }, []);

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
     {hotCollections.length > 0 ? (
  <OwlCarousel
  className="owl-theme"
  loop
  margin={10}
  nav
  responsive={{
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  }}
>
    {hotCollections.map((item, index) => (
      <Link
        to={`/item-details/${item.nftId}`}
        key={item.nftId || index}
      >
        <div className="item">
          <div className="nft_coll">
            <div className="nft_wrap">
              <img
                src={item.nftImage}
                className="lazy img-fluid"
                alt={item.title}
              />
            </div>
            
            <div className="nft_coll_pp">
              <div>
                <img
                  className="lazy"
                  src={item.authorImage}
                  alt={`${item.title} author`}
                />
              </div>
              <i className="fa fa-check"></i>
            </div>

            <div className="nft_coll_info">
              <h4>{item.title}</h4>
              <span>ERC-{item.code}</span>
                </div>
              </div>
            </div>
          </Link>
          ))}
          </OwlCarousel>
) : (
  <div className="skeleton-wrapper1">
    {new Array(3).fill(0).map((_, index) => (
      <div
        className="skeleton skeleton-explore"
        key={index}
      ></div>
    ))}
  </div>
)}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
