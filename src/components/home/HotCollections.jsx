import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import axios from 'axios';

import Slider from "react-slick";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();


const HotCollections = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
     // Simulate data loading
     setTimeout(() => {
        setData({ data });
        setIsLoading(false);
     }, 2000);
  }, []);

  const [collections, setCollections] = useState([]);
  console.log(collections)

  async function getData() {

    try {

      const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');

      setCollections(response.data);

    } catch (error) {

      console.error('Error fetching data:', error);

    }

  }

  useEffect(() => {

    getData();

  }, []);

    const sliderRef = useRef(null);

    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "circle", background: "black" }}
          onClick={onClick}
        />
      );
    }

    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "", background: "black" }}
          onClick={onClick}
        />
      );
    }

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow className="slick-slick-prev pull-left fa fa-angle-left"  onClick={() => sliderRef.current.slickNext()} />,
      prevArrow: <SamplePrevArrow className="slick-next pull-right fa fa-angle-right" onClick={() => sliderRef.current.slickPrev()} />,
      responsive: [
        {
          breakpoint: 1200, // lg
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 992, // md
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 768, // sm
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  

  return (

    <section id="section-collections" className="no-bottom">

      <div className="container">

        <div className="row">

          <div className="col-lg-12">

            <div data-aos="fade-up" className="text-center">

              <h2>Hot Collections</h2>

              <div className="small-border bg-color-2"></div>

            </div>

           </div>

      
<Slider ref={sliderRef} {...settings}>
          {collections.slice(0, 4).map((collection, index) => (

            <div data-aos="fade-up" className="sslick-arrow px-1" key={index}>

<div className="nft__item">
                <div className="nft_wrap">

                  <Link to={`/item-details/${collection.nftId}`}>

                    <img src={collection.nftImage} className="lazy img-fluid" alt="" />

                  </Link>

                </div>

                <div className="nft_coll_pp">

                  <Link to={`/author/${collection.authorId}`}>

                    <img className="lazy pp-coll" src={collection.authorImage} alt="" />

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

        </div>

      </div>

    </section>

  );

};

const CustomNextArrow = ({ onClick }) => (
  <button type="button" className="custom-next-arrow" onClick={onClick}>
    Next
  </button>
);

const CustomPrevArrow = ({ onClick }) => (
  <button type="button" className="custom-prev-arrow" onClick={onClick}>
    Previous
  </button>
);


export default HotCollections;
