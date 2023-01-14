import axios from "axios";
import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [items, setItems] = useState([]);

  async function fetchCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setItems(data);
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  const options = {
    items: 4,
    margin: 10,
    nav: true,
    loop: true,
    dots: false,
    responsiveRefreshRate: 50,
    responsive: {
      1200: {items: 4},
      768: {items: 3},
      470: {items: 2},
      0: {items: 1}
    }
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

          {items.length ? (
            <OwlCarousel
              className="owl-theme owl-custom"
              loop
              margin={10}
              nav
              {...options}
            >
              {items.map((item, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
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
              ))}
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel
                className="owl-theme owl-custom"
                loop
                margin={10}
                nav
                {...options}
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton height={"100%"} width={"100%"} />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton
                      height={"60px"}
                      width={"60px"}
                      borderRadius={"50%"}
                    />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton
                      height={"20px"}
                      width={"150px"}
                      borderRadius={"8px"}
                    />
                  </div>
                  <Skeleton
                    height={"20px"}
                    width={"80px"}
                    borderRadius={"8px"}
                  />
                </div>
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
