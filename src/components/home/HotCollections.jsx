import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HotCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
          { signal: controller.signal }
        );
        const list = Array.isArray(data) ? data : Object.values(data || {});
        setCollections(list)
      } catch (e) {
        if (axios.isCancel(e)) {
          return
        }
        console.error("hotCollections fetch failed:", e);
        setCollections([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const settings = useMemo(() => ({
    arrows: true,
    dots: false,
    infinite: true,
    speed: 450,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      },
    ],
  }), []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2" />
          </div>
        </div>

        <div className="relative">
          {loading ? (
            // Skeletons
            <div className="skeleton-row">
              {[...Array(4)].map((_, i) => (
                <div className="sk-card" key={i}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <div className="sk sk-img sk--shimmer" />
                    </div>

                    <div className="nft_coll_pp">
                      <div className="skeleton sk-avatar sk--shimmer" />
                      <div className="skeleton sk-badge sk--shimmer" />
                    </div>

                    <div className="nft_coll_info">
                      <div className="skeleton sk-title sk--shimmer" />
                      <div className="skeleton sk-sub sk--shimmer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Real slider
            <Slider {...settings}>
              {collections.map((item) => (
                <div className="nft_coll" key={item.id}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={item.nftImage}
                        className="lazy img-fluid"
                        alt={item.title}
                      />
                    </Link>
                  </div>

                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img className="lazy pp-coll" src={item.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check" />
                  </div>

                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{item.title}</h4>
                    </Link>
                    <span>ERC-{item.code}</span>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
}
