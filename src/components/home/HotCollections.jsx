import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    speed: 500,
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setData(data);
      setLoading(false);
    }
    getData();
  }, []);

  console.log(loading);
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-up" data-aos-duration="1000">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
              <div className="slider-container mr-10">
                <div className="row">
                  {loading && (
                    <OwlCarousel
                      className="owl-theme"
                      items={4}
                      loop
                      margin={10}
                      nav
                      dots
                      responsive={{
                        0: { items: 1 }, // 1 item for very small screens
                        600: { items: 2 }, // 2 items for small screens
                        900: { items: 3 }, // 3 items for medium screens
                        1200: { items: 4 }, // 4 items for large screens
                      }}
                    >
                      {new Array(4).fill(0).map((_, index) => (
                        <div
                          className="mx-auto item"
                          key={index}
                          style={{ width: "300px" }}
                        >
                          <div className="nft_coll">
                            <div className="nft_wrap">
                              <Skeleton width={"100%"} height={"100%"} />
                            </div>
                            <div className="nft_coll_pp">
                              <Skeleton
                                width={60}
                                height={60}
                                borderRadius={1000}
                              />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="nft_coll_info">
                              <h4>
                                <Skeleton width={"40%"} height={20} />
                              </h4>
                              <span>
                                <Skeleton width={"20%"} height={20} />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </OwlCarousel>
                  )}
                  {!loading && (
                    <OwlCarousel
                      className="owl-theme"
                      items={4}
                      loop
                      margin={10}
                      nav
                      dots
                      responsive={{
                        0: { items: 1 }, // 1 item for very small screens
                        600: { items: 2 }, // 2 items for small screens
                        900: { items: 3 }, // 3 items for medium screens
                        1200: { items: 4 }, // 4 items for large screens
                      }}
                    >
                      {data.map((elem, index) => (
                        <div
                          className="mx-auto item"
                          key={index}
                          style={{ width: "300px" }}
                        >
                          <div className="nft_coll">
                            <div className="nft_wrap">
                              <Link to={`/item-details/${elem.nftId}`}>
                                <img
                                  src={elem.nftImage}
                                  className="lazy img-fluid"
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="nft_coll_pp">
                              <Link to={`/author/${elem.authorId}`}>
                                <img
                                  className="lazy pp-coll"
                                  src={elem.authorImage}
                                  alt=""
                                />
                              </Link>
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="nft_coll_info">
                              <Link to="/explore">
                                <h4>{elem.title || <Skeleton count={1} />}</h4>
                              </Link>
                              <span>{elem.code || <Skeleton count={1} />}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </OwlCarousel>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;