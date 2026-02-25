import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    className: "owl-theme",
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 3 },
      1200: { items: 4 },
    },
  };

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-up" data-aos-duration="1000">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>

            <div className="slider-container mr-10">
              <OwlCarousel {...settings}>
                {loading
                  ? new Array(4).fill(0).map((_, index) => (
                      <div
                        className="mx-auto item"
                        key={index}
                        style={{ width: "300px" }}
                      >
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Skeleton width={"100%"} height={250} />
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
                    ))
                  : data.map((elem, index) => (
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
                                alt={elem.title}
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
                              <h4>{elem.title}</h4>
                            </Link>
                            <span>{elem.code}</span>
                          </div>
                        </div>
                      </div>
                    ))}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;