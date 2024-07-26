import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../css/styles/owl.carousel.css";
import "../../css/styles/shimmer.css";
import { ShimmerDiv, ShimmerText, ShimmerTitle } from "shimmer-effects-react";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollection(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const options = {
    loop: true,
    nav: true,
    items: 4,
    dots: false,
    margin: 5,
    slidesPerView: 4,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      800: {
        items: 3,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

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
          {loading ? (
            <div className="loading-container">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div className="loading-content--container" key={index}>
                    <div className="nft_coll loading-content">
                      <div className="nft_wrap--loading">
                        <ShimmerDiv
                          className="nft-wrap--img"
                          mode="light"
                          height={"100%"}
                          width={"100%"}
                        />
                      </div>
                      <div className="nft_coll_pp">
                        <ShimmerDiv
                          mode="light"
                          center={true}
                          height={50}
                          width={50}
                          rounded={50}
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <ShimmerTitle
                          mode="light"
                          center={true}
                          width={60}
                          line={1}
                        />
                        <ShimmerText
                          mode="light"
                          center={true}
                          width={40}
                          line={1}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <OwlCarousel {...options}>
              {collection.map((item, index) => (
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                  key={index}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={item.nftImage || { nftImage }}
                          className="lazy img-fluid"
                          alt={item.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage || { AuthorImage }}
                          alt={item.title}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;