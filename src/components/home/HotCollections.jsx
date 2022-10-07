import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from 'keen-slider/react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const axios = require('axios').default;
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
  const [collectionsData, setCollectionsData] = useState([]);
  const [sliderRef, instanceRef] = useKeenSlider(options)

  function Arrow(props) {
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${props.left ? "arrow-left" : "arrow-right"}`}
      >
        {props.left && <ChevronLeftIcon />}
        {!props.left && <ChevronRightIcon />}
      </svg>
    );
  }

  async function fetchData() {
    setLoading(true)
    const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections#')
    setCollectionsData(response.data);
    setLoading(false)
  }

  useEffect(() => {
    fetchData();
    setOptions({
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
            spacing: 12,
          },
        },
        "(min-width: 900px)": {
          slides: {
            perView: 3,
            spacing: 24,
          },
        },
        "(min-width: 1200px)": {
          slides: {
            perView: 4,
            spacing: 24,
          },
        },
      },
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
          {loading ? (
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {new Array(6).fill(0).map((_, index) => (
                  <div className="nft_coll keen-slider__slide" key={index}>
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <Skeleton width="100%" height="195px" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <Skeleton width="100px" height="20px" />
                      </Link>
                      <div></div>
                      <Skeleton width="69px" height="20px" />
                    </div>
                  </div>
                ))}
              </div>
              <>
                <Arrow left onClick={() => instanceRef.current?.prev()} />
                <Arrow onClick={() => instanceRef.current?.next()} />
              </>
            </div>
          ) : (
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {collectionsData.map((item) => (
                  <div className="keen-slider__slide" key={item.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img src={item.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img className="lazy pp-coll" src={item.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
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
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;