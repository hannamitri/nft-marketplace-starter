import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './HotCollections.css'

const HotCollections = () => {
  const [collections, setCollections] = useState([])
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 10 },
    breakpoints: {
      "(max-width: 1200px)": { slides: { perView: 3, spacing: 10 } },
      "(max-width: 768px)": { slides: { perView: 2, spacing: 5 } },
      "(max-width: 576px)": { slides: { perView: 1, spacing: 5 } },
    },
  })

  async function fetchCollections() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
    setCollections(data)
  }

  useEffect(() => {
    fetchCollections()
  }, [])

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
          <div className="slider-nav">
            <button
              onClick={() => slider.current?.prev()}
              className="nav-btn left"
            >
              <i className="fa fa-chevron-left"></i>
            </button>
            <button
              onClick={() => slider.current?.next()}
              className="nav-btn right"
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
          <div ref={sliderRef} className="keen-slider">
          {collections.map((collection) => (
            <div className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12" key={collection.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
