import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  async function getCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(data);
  }
  useEffect(() => {
    getCollections();
  }, []);

  const options = {
    nav: true,
    loop: true,
    items: 4,
    margin: 10,
    dots: false,
    stagePadding: 10,
    responsiveRefreshRate: 50,
    responsive: {
      1200: { items: 4 },
      768: { items: 3 },
      570: { items: 2 },
      0: { items: 1 },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-in" data-aos-offset="50" data-aos-once="true">Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-offset="50" data-aos-once="true">
              <OwlCarousel className="owl-theme" key={Date.now()} {...options}>
              { collections.length > 0?
              
              collections.map((collection) => (
                <div
                className="collections"
                  style={{ display: "flex" }}
                  key={collection.id}
                  >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="nft_img"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                          />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))
              :
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
                <Skeleton height={"20px"} width={"80px"} borderRadius={"8px"} />
              </div>
              }
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
