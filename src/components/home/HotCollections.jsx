import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "../../components/Skeleton";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        console.log("API DATA:", res.data);
        setCollections(res.data);
      } catch (err) {
        console.error("Error fetching collections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const Arrow = ({ onClick, direction }) => (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [direction === "next" ? "right" : "left"]: "-25px",
        zIndex: 10,
        cursor: "pointer",
        background: "rgba(0,0,0,0.6)",
        color: "#fff",
        borderRadius: "50%",
        padding: "10px",
      }}
    >
      {direction === "next" ? "▶" : "◀"}
    </div>
  );

  const settings = {
    dots: true,
    infinite: collections.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <Slider {...settings}>
          {loading
            ? [...Array(4)].map((_, i) => <CollectionCardSkeleton key={i} />)
            : collections.map((item, index) => (
                <div
                  key={item.nft_id || item.nftId || index}
                  style={{ padding: "0 10px" }}
                >
                  <div className="nft_coll" style={{ position: "relative" }}>
                    <div className="nft_wrap">
                      <Skeleton
                        src={item.nft_image || item.nftImage}
                        alt={item.title}
                        className="nft__img"
                      />
                    </div>

                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.author_id || item.authorId}`}>
                        <div
                          style={{
                            position: "absolute",
                            bottom: "4px",
                            left: "15px",
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "3px solid #fff",
                            background: "#fff",
                          }}
                        >
                          <Skeleton
                            src={item.author_image || item.authorImage}
                            alt="author"
                            className="pp-coll"
                          />
                        </div>
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft_coll_info">
                      <h4>{item.title}</h4>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                </div>
              ))}
        </Slider>
      </div>
    </section>
  );
};

const CollectionCardSkeleton = () => (
  <div style={{ padding: "0 10px" }}>
    <div className="nft_coll">
      <div className="nft_wrap">
        <div className="skeleton skeleton-img"></div>
      </div>

      <div className="nft_coll_pp">
        <div className="skeleton skeleton-circle"></div>
      </div>

      <div className="nft_coll_info">
        <div className="skeleton skeleton-text short"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
    </div>
  </div>
);

export default HotCollections;

          
