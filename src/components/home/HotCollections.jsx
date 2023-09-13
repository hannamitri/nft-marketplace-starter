import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useKeenSlider } from "keen-slider/react";

const HotCollections = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    breakpoints: {
      "(min-width: 0px)": {
        slides: {
          perView: 1,
        },
      },
      "(min-width: 600px)": {
        slides: {
          perView: 2,
        },
      },
      "(min-width: 1000px)": {
        slides: {
          perView: 4,
        },
      },
    },
  });

  function Arrow(props) {
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${props.left ? "arrow-left" : "arrow-right"}`}
      >
        {props.left && <KeyboardArrowLeftIcon />}
        {!props.left && <KeyboardArrowRightIcon />}
      </svg>
    );
  }

  async function getHotCollections() {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    console.log(response.data);
  }

  useEffect(() => {
    getHotCollections();
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
          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {new Array(6).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                  key={index}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img src={nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={AuthorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>Pinky Ocean</h4>
                      </Link>
                      <span>ERC-192</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <>
              <Arrow left onClick={() => instanceRef.current?.prev()} />
              <Arrow onClick={() => instanceRef.current?.next()} />
            </>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
