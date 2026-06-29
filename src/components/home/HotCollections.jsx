import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";


const HotCollections = ({ loading, hotCollections = [] }) => {
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
          <OwlCarousel
            className="owl-theme"
            loop
            data-aos="fade-up"
            data-aos-duration="700"
            nav
            // key={loading}
            dots={false}
            margin={8}
            navText={["<", ">"]}
            responsive={{
            0: { items: 1 },
            572: { items: 2 },
            992: { items: 3 },
            1200: { items: 4 },
            }}
          >
            {loading ? 
              (
                <>
                {new Array(5).fill(0).map((_, i) => (
                <div 
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ width: "100%", maxWidth: "100%", padding: "0" }}
                key={i}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="200px" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton
                        width="50px"
                        height="50px"
                        borderRadius="50%"
                      />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="100px" height="20px" />
                      <br />
                      <Skeleton width="60px" height="20px" />
                    </div>
                  </div>
                </div>
                ))}
                </>
                ) : (
                hotCollections.map((collection, index) => (
                  <div className="col-xs-12" key={index}>
                    <div className="nft_coll w-full">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img src={collection.nftImage || nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img className="lazy pp-coll" src={collection.authorImage || AuthorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>{collection.code}</span>
                      </div>
                    </div>
                  </div>
              ))
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
