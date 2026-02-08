import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useKeenSlider} from "keen-slider/react";
import SkeletonCard from "../UI/SkeletonCard.jsx"



const HotCollections = () => {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
    mode: "snap",
    breakpoints: {
    "(max-width: 1200px)": {
      slides: {
        perView: 3,
        spacing: 15,
      },
    },

    "(max-width: 768px)": {
      slides: {
        perView: 2,
        spacing: 10,
      },
    },

    "(max-width: 480px)": {
      slides: {
        perView: 1,
        spacing: 5,
      },
    },
  },
  });

  useEffect(() => {
  if (!loading && slider.current) {
    slider.current.update();
  }
  }, [loading, slider]);

  useEffect(() => {
    async function getCollections() {
      try {
        const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");

      setCollections(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


    getCollections();
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
          <div className="carousel-wrapper">
              <button className="carousel-arrow left"
              onClick={() => slider.current?.prev()}>&#10094;</button>
            <div ref={sliderRef} className="keen-slider">
              {loading?  new Array(4).fill(0).map((_, index) => (
                <div className="keen-slider__slide" key={index}>
                  <SkeletonCard />
                </div>
              ))
              : collections.map(collection => (
                <div className="keen-slider__slide" key={collection.id}>
                    <div className="nft_coll">
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
            </div>
            <button className="carousel-arrow right"
              onClick={() => slider.current?.next()}>&#10095;</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
