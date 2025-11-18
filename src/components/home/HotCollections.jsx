import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(res.data || []);
      } catch (err) {
        console.error("Failed to fetch hot collections", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) return <p className="text-center">Loading Hot Collections...</p>;
  if (!collections.length) return <p className="text-center">No collections found.</p>;

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        {/* Section title */}
        <div className="text-center mb-4">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        {/* Swiper carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={4}              // 4 slides per row on desktop
          spaceBetween={20}              // px between slides
          navigation                     // show arrows
          pagination={{ clickable: true }} // show bullets
          loop={true}                    // infinite loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 12 },
            576: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 18 },
            992: { slidesPerView: 4, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {collections.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="nft_coll p-2"
                style={{
                  borderRadius: "12px",
                  background: "#fff",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                {/* NFT Thumbnail */}
                <div className="nft_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      alt={item.title}
                      style={{ width: "100%", height: "220px", objectFit: "cover" }}
                      onError={(e) => { e.currentTarget.src = "/fallback-nft.png"; }}
                    />
                  </Link>
                </div>

                {/* Author */}
                <div className="d-flex align-items-center mt-3 px-2">
                  <Link to={`/author/${item.authorId}`}>
                    <img
                      src={item.authorImage}
                      alt={item.title}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #fff",
                      }}
                      onError={(e) => { e.currentTarget.src = "/fallback-author.png"; }}
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
      </div>
    </section>
  );
};

export default HotCollections;
