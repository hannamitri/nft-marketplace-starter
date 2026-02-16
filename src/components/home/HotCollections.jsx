import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from 'axios'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Skeleton from '../UI/Skeleton.jsx'


const HotCollections = ({ loading, setLoading }) => {

  const [collections, setCollections ] = useState([])
  
  
  const [sliderRef, instanceRef] = useKeenSlider({
      slides: {
        perView: 4,
        spacing: 15,
      },
      loop: true,
      breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 600px)": {
        slides: { perView: 1, spacing: 5 }
      }
    }
    })

    useEffect(() => {
      const fetchCollections = async () => {
        try {
          const res = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
          const data = res.data
          setCollections(data)
        } catch (error) {
          console.error(error)
        }
      }
      fetchCollections()
      setLoading(false)
    }, [])
  

  useEffect(() => {
  if (instanceRef.current) {
    instanceRef.current.update();
  }
}, [collections]);



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
          <div ref={sliderRef} className="keen-slider">
          {loading ? Array(4).fill(null).map((_, index) => (
            <div className="keen-slider__slide" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Skeleton width="100%" height="200px" borderRadius="8px" />
                </div>
                <div className="nft_coll_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Skeleton width="60%" height="20px" borderRadius="4px" />
                  <Skeleton width="40%" height="16px" borderRadius="4px" />
                </div>
              </div>
            </div>
          )) : collections.map(collection => 
            <div className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12" key={collection.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${collection.id}`}>
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
                  <span>{collection.nftId}</span>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
