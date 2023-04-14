import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, A11y } from 'swiper';

const HotCollections = () => {

  let navigate = useNavigate()
  const [userData, setUserData] = useState([]);

  async function fetchData() {
    const { data } = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
    setUserData(data)
    console.log(data)
  }

  useEffect(() => {
    fetchData()
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
            modules={[Navigation, A11y]}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            effect={"cube"}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}>
            {userData.map((user) => (
              <SwiperSlide key={user.id}>
                <div className="col-lg-10 col-md-8 col-sm-10 col-xs-12 offset-lg-1" >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img src={user.nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img className="lazy pp-coll" src={user.authorImage} alt={user.title} />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{user.title}</h4>
                      </Link>
                      <span>ERC - {user.code}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

          </Swiper>



        </div>
      </div>
    </section>


  );


};

export default HotCollections;
