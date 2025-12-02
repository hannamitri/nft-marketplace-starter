import React from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import useFetch from "../UI/apiFetch";
import Skeleton from "../UI/Skeleton";

function HotCollections() {
  const { data, loading } = useFetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      450: {
        items: 2
      },
      950: {
        items: 3
      },
      1400: {
        items: 4
      }
    }
  };

  return (
    <div data-aos="fade-up">
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            {loading ? (
              <OwlCarousel className="owl-theme" key="loading" {...options}>
                {new Array(8).fill(0).map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton width="100%" height="200px" borderRadius="8px" />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton width="120px" height="20px" borderRadius="4px" />
                        <Skeleton width="80px" height="16px" borderRadius="4px" />
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              <OwlCarousel className="owl-theme" key="loaded" {...options}>
                {data && data.map((collection) => (
                  <div key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to={`/explore?collection=${collection.id}`}>
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default HotCollections;
