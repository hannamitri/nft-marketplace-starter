import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import sliderSettings from "../Animations/silder";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/slider.css";
import "../../css/styles/skeleton.css";

const HotCollections = () => {
  const [collections, setDataCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setDataCollections(response.data);
      } catch (error) {
        console.log("Failed to get data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <Slider {...sliderSettings}>
          {(loading ? Array(4).fill({}) : collections).map((item, index) => (
            <div key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  {loading ? (
                    <div className="skeleton-box" />
                  ) : (
                    <Link to={`/item-detail/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  )}
                </div>

                <div className="nft_coll_pp">
                  {loading ? (
                    <div className="skeleton skeleton-avatar" />
                  ) : (
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={item.authorImage}
                        alt=""
                      />
                    </Link>
                  )}
                  {!loading && <i className="fa fa-check" />}
                </div>

                <div className="nft_coll_info">
                  {loading ? (
                    <>
                      <div className="skeleton skeleton-line long" />
                      <div className="skeleton skeleton-line short" />
                    </>
                  ) : (
                    <>
                      <Link to={`/explore/${item.id}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HotCollections;
