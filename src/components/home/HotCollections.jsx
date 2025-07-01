import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css"; // your shimmer styles

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
        const data = await res.json();
        setCollections(data);
      } catch (err) {
        console.error("Failed to fetch hot collections", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const SkeletonCard = () => (
    <div className="px-2">
      <div className="nft_coll skeleton">
        <div className="nft_wrap shimmer-rect" style={{ height: "200px" }} />
        <div className="nft_coll_pp shimmer-circle" />
        <div className="nft_coll_info">
          <div className="shimmer-line short" />
          <div className="shimmer-line tiny" />
        </div>
      </div>
    </div>
  );

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center mb-4">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        {loading ? (
          <Slider {...settings}>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </Slider>
        ) : (
          <Slider {...settings}>
            {collections.map((item, index) => (
              <div key={index} className="px-2">
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy img-fluid"
                        alt={item.title}
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={item.authorImage}
                        alt={item.authorName}
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to={`/collection/${item.id}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <span>ERC-{item.code || "721"}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default HotCollections;
