import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton.jsx";

const HotCollections = () => {
  const { nftId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    dots: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 },
      1200: { items: 4 },
    },
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const resultData = response.data;

        if (Array.isArray(resultData) && resultData.length > 0) {
          setData(resultData);
        } else {
          console.error("Error: No valid data returned.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [nftId]);

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
        </div>
        <div style={{ marginTop: "20px" }}>
          {loading ? (
            <div className="row">
              {Array(1)
                .fill(0)
                .map((_, index) => (
                  <div className="px-1" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton
                          width="100%"
                          height="260px"
                          borderRadius="10px"
                        />
                      </div>
                      <div
                        className="nft_coll_pp"
                        style={{ marginTop: "10px" }}
                      >
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>
                      <div
                        className="nft_coll_info"
                        style={{ marginTop: "10px", textAlign: "center" }}
                      >
                        <Skeleton
                          width="70%"
                          height="24px"
                          borderRadius="5px"
                          style={{ margin: "0 auto 8px auto" }}
                        />
                        <Skeleton
                          width="40%"
                          height="18px"
                          borderRadius="5px"
                          style={{ margin: "0 auto" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : data.length > 0 ? (
            <OwlCarousel className="owl-theme" {...options}>
              {data.map((item, index) => (
                <div className="item" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        {item.nftImage && (
                          <img
                            src={item.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        )}
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
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
          ) : (
            <p className="text-center">No collections available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;