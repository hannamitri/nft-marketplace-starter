import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getHotCollections() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        setCollections(response.data);
      } catch (error) {
        console.error("Hot collections API error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

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
          {error && <p>API error: {error}</p>}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            passiveListeners={true}
            touchStartPreventDefault={false}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              1000: { slidesPerView: 4 },
            }}
          >
            {loading && new Array(4).fill(0).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="nft_coll">
                  <Skeleton width="100%" height="200px" borderRadius="8px" />
                  <div className="nft_coll_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton width="70%" height="24px" borderRadius="4px" />
                    <Skeleton width="40%" height="18px" borderRadius="4px" />
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {!loading && collections.map(collection => (
              <SwiperSlide key={collection.id}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${collection.id}`} state={{ collection }}>
                      <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link
                      to={`/author/${collection.authorId || collection.id}`}
                      state={{ author: collection }}
                    >
                      <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to={`/item-details/${collection.id}`} state={{ collection }}>
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>ERC-{collection.code}</span>
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
