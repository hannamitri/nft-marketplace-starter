import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import axios from "axios";
import 'swiper/css';
import 'swiper/css/navigation';
import '../../css/styles/arrows.css'

const HotCollections = () => {

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);


  async function getCollections() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setCollections(data);
    setLoading(false);
    console.log(data);
  }

  useEffect(() => {
    getCollections();
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
          <Swiper
            navigation={true}
            loop={true}
            spaceBetween={10}
            slidesPerView={1}
            allowTouchMove={false}
            breakpoints={{
              600: {
                slidesPerView: 1
              },
              800: {
                slidesPerView: 2
              },
              975: {
                slidesPerView: 3
              }
            }}
            modules={[Navigation]}
          >
            {loading ? new Array(4).fill(0).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img src={null} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img className="lazy pp-coll" src={null} alt="" />
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
              </SwiperSlide>
            )) : collections.map((colItem) => (
              <SwiperSlide className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={colItem.id}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img src={colItem.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img className="lazy pp-coll" src={colItem.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{colItem.title}</h4>
                    </Link>
                    <span>ERC-{colItem.code}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section >
  );
};

export default HotCollections;