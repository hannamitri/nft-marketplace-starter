import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  async function main() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    console.log(data);
    setCollections(data);
  }
  useEffect(() => {
    main();
  }, []);
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
  const options = {
    margin: 4,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    smartSpeed: 1000,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
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
    <section id='section-collections' className='no-bottom'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Hot Collections</h2>
              <div className='small-border bg-color-2'></div>
            </div>
          </div>

          <OwlCarousel className='owl-theme' {...options}>
            {collections.map((collection) => (
              // <div
              //   className='col-lg-3 col-md-6 col-sm-6 col-xs-12'
              //   class='item'
              //   key={collection.id}
              // >
              <div className='nft_coll' key={collection.id}>
                <div className='nft_wrap'>
                  <Link to='/item-details'>
                    <img
                      src={collection.nftImage}
                      className='lazy img-fluid'
                      alt=''
                    />
                  </Link>
                </div>
                <div className='nft_coll_pp'>
                  <Link to='/author'>
                    <img
                      className='lazy pp-coll'
                      src={collection.authorImage}
                      alt=''
                    />
                  </Link>
                  <i className='fa fa-check'></i>
                </div>
                <div className='nft_coll_info'>
                  <Link to='/explore'>
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>ERC-{collection.code}</span>
                </div>
              </div>
              // </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
