import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import axios from "axios";
import Skeleton from "../UI/Skeleton";
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
              400: {
                slidesPerView: 2
              },
              800: {
                slidesPerView: 3
              },
              975: {
                slidesPerView: 4
              }
            }}
            modules={[Navigation]}
          >
            {loading ? new Array(4).fill(0).map((_, index) => (
              <SwiperSlide key={index}>
                <div>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <Skeleton 
                          width={1000}
                          height={1000}
                          borderRadius={8}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton 
                        width={50}
                        height={50}
                        borderRadius={100}
                      />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton 
                        width={100}
                        height={16}
                        borderRadius={4}
                      />
                      <br></br>
                      <span>
                        <Skeleton 
                          width={80}
                          height={16}
                          borderRadius={4}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )) : collections.map((colItem) => (
              <SwiperSlide className="" key={colItem.id}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${colItem.nftId}`}>
                      <img src={colItem.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${colItem.authorId}`}>
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