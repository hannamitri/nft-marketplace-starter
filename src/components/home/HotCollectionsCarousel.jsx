import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Skeleton Loader for carousel
const HotCollectionsSkeleton = () => {
  return (
    <div className="row">
      {Array.from({ length: 4 }).map((_, i) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-3" key={i}>
          <div className="nft_coll skeleton" style={{ borderRadius: "12px", backgroundColor: "#eee", padding: "10px" }}>
            <div style={{ width: "100%", height: "220px", backgroundColor: "#ddd", borderRadius: "12px" }}></div>
            <div className="mt-2" style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#ccc" }}></div>
              <div style={{ marginLeft: "10px", flex: 1, height: "16px", backgroundColor: "#ccc", borderRadius: "4px" }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const HotCollectionsCarousel = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(res.data);
      } catch (err) {
        console.error("Failed to fetch hot collections", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  if (loading) return <HotCollectionsSkeleton />;

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center mb-4">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={4}
          spaceBetween={20}
          navigation
          pagination={{ el: ".external-swiper-pagination", clickable: true }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 12 },
            576: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 18 },
            992: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {collections.map((item) => (
            <SwiperSlide key={item.nftId}>
              <div
                className="nft_coll p-2"
                data-aos="fade-up"
                data-aos-duration="600"
                style={{
                  borderRadius: "12px",
                  background: "#fff",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                <div className="nft_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      alt={item.title}
                      style={{ width: "100%", height: "220px", objectFit: "cover" }}
                      onError={(e) => (e.currentTarget.src = "/fallback-nft.png")}
                    />
                  </Link>
                </div>

                <div className="d-flex align-items-center mt-3 px-2">
                  <Link to={`/author/${item.authorId}`}>
                    <img
                      src={item.authorImage}
                      alt={item.title}
                      style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }}
                      onError={(e) => (e.currentTarget.src = "/fallback-author.png")}
                    />
                  </Link>
                  <div className="ms-2">
                    <Link to={`/explore/${item.id}`}>
                      <h5 style={{ margin: 0, fontSize: "1rem" }}>{item.title}</h5>
                    </Link>
                    <small className="text-muted">ERC-{item.code}</small>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* <div className="external-swiper-pagination text-center mt-4"></div> */}
      </div>
    </section>
  );
};

export default HotCollectionsCarousel;
