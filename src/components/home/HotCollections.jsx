import React, { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import HotCollection from "../UI/HotCollection";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCollections() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setHotCollections(data);
      setLoading(false);
  }
  useEffect(() => {
    fetchCollections();
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

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false, 
            }}
            spaceBetween={8}
            breakpoints={{
              0: { slidesPerView: 1 },
              572: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
          >
            {loading
              ? new Array(5).fill(0).map((_, i) => (
                  <SwiperSlide key={i}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton width="100%" height="200px" />
                      </div>

                      <div className="nft_coll_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Skeleton width="100px" height="20px" />
                        <br />
                        <Skeleton width="60px" height="20px" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              : hotCollections.map((collection) => (
                  <SwiperSlide key={collection.id}>
                    <HotCollection
                      nftImage={collection.nftImage}
                      authorImage={collection.authorImage}
                      title={collection.title}
                      code={collection.code}
                      nftId={collection.nftId}
                      authorId={collection.authorId}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

