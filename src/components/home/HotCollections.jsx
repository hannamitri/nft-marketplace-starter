import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const HotCollections = ({ hotCollections, loading, error }) => {
  const responsive = {
    0: { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    1200: { items: 4 },
  };

  const emptyArray = Array(4).fill(0);

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
            <OwlCarousel
              className="hot-collections_carousel"
              items={4}
              loop
              margin={10}
              nav
              responsive={responsive}
              key="loading"
            >
              {emptyArray.map((item, index) => {
                return (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="152px" borderRadius="0" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width="60px" height="60px" borderRadius="50%" />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="65%" height="18px" borderRadius="4px" />
                      <div className="mt-2">
                        <Skeleton
                          width="40%"
                          height="14px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </OwlCarousel>
          ) : error ? (
            <div className="col-lg-12">
              <div className="text-center">
                <p>{error}</p>
              </div>
            </div>
          ) : (
            hotCollections.length > 0 && (
              <OwlCarousel
                className="hot-collections_carousel"
                items={4}
                loop
                margin={10}
                nav
                responsive={responsive}
                key="loaded"
              >
                {hotCollections.map(
                  ({ id, authorImage, code, nftImage, title }) => (
                    <div className="nft_coll" key={id}>
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{title}</h4>
                        </Link>
                        <span>ERC-{code}</span>
                      </div>
                    </div>
                  ),
                )}
              </OwlCarousel>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
