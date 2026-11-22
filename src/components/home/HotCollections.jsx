import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from 'axios';
import {useEffect, useState} from 'react';
import Slider from "react-slick";


const HotCollections = () => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
//       .then((res) => {
//           setCollections(res.data); // Correctly set the state with fetched data
//       })
//       .catch((error) => {
//           console.error("Error fetching data:", error); // Handle any errors
//       })
//           .finally(() => {
//       setLoading(false);
//   }, []); // Correct dependency array

useEffect(() => {
  axios
    .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    .then((res) => {
      setCollections(res.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

const NextArrow = ({ onClick }) => (
  <button
    type="button"
    className="collection-arrow collection-arrow-next"
    onClick={onClick}
    aria-label="Next collections"
  >
    ›
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    type="button"
    className="collection-arrow collection-arrow-prev"
    onClick={onClick}
    aria-label="Previous collections"
  >
    ‹
  </button>
);

    // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 items
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />, // Use custom next arrow
    prevArrow: <PrevArrow />, // Use custom previous arrow
      responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
      },
    },
  ],
  };
console.log("Hot Collections loading:", loading);
  return (

    
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>

{loading ? (
  <div>Loading skeletons here </div>
) : (
<Slider {...settings} className="hot-collections-slider">
  {collections.map((collection, index) => (
    <div className="collection-slide" key={index}>
      <div className="nft_coll">
        <div className="nft_wrap">
          <Link to="/item-details">
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
          <Link to="/explore">
            <h4>{collection.title}</h4>
          </Link>
          <span>ERC-{collection.code}</span>
        </div>
      </div>
    </div>
  ))}
</Slider>
)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
