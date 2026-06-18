import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    )
      .then((res) => res.json())
      .then((data) => {
        setCollections(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hot Collections API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading Collections...</h4>
      </div>
    );
  }

  return (
    <section
      className="container"
      style={{
        paddingTop: "80px",
      }}
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <OwlCarousel
            className="owl-theme"
            loop={true}
            margin={20}
            nav={true}
            dots={false}
            responsive={{
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 4 },
            }}
          >
            {collections.map((item, index) => (
              <div className="item" key={item.nftId || index}>
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
                    <Link to="/author">
                      <img
                        className="lazy"
                        src={item.authorImage}
                        alt={item.title}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="nft_coll_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>

                    <span>ERC-{item.nftId}</span>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
