import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AOS from "aos";
import 'aos/dist/aos.css';

const SkeletonLoader = () => (
  <>
    <div className="nft_coll">
      <div className="nft_wrap">
        <div className="skeleton-box skeleton-image-fluid"></div>
      </div>
      <div className="nft_coll_pp">
        <a href="">
          <div className="skeleton-box skeleton-pp-coll"></div>
        </a>
        <i className="fa fa-check"></i>
      </div>
      <div className="skeleton-box skeleton-title"></div>
      <div className="skeleton-box skeleton-code"></div>
    </div>
  </>
);

const HotCollections = () => {
  const [carousel, setCarousel] = useState([]);
  const [loading, setLoading] = useState(true);

  async function datacollection() {
    setLoading(true);
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);
    setCarousel(data);
    setLoading(false);
    console.log(data);
  }

  useEffect(() => {
    datacollection();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      }
    }
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="zoom-out" data-aos-duration="1000">Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <OwlCarousel className="owl-theme" {...carouselOptions}>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <div key={index}>
                    <SkeletonLoader />
                  </div>
                ))}
            </OwlCarousel>
          ) : (
            <>
              {carousel.length > 0 && (
                <OwlCarousel
                  data-aos="zoom-out"
                  data-aos-duration="800"
                  className="owl-theme"
                  {...carouselOptions}
                >
                  {carousel.map((nft, index) => (
                    <div key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${nft.nftId}`}>
                            <img
                              src={nft.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${nft.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={nft.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{nft.title}</h4>
                          </Link>
                          <span>ERC-{nft.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
