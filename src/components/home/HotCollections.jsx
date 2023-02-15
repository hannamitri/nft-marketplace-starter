import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [author, setAuthor] = useState([]);

  async function fetchHotCollectionsData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setAuthor(data);
  }
  useEffect(() => {
    fetchHotCollectionsData();
  }, []);

  const options = {
    nav: true,
    loop: true,
    items: 4,
    margin: 10,
    dots: false,
    responsive: {
      0: { items: 1 },
      470: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
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

          <OwlCarousel {...options}>
            {author.length ? (
              author.map((auth) => (
                <div className="nft_coll" key={auth.id}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${auth.nftId}`}>
                      <img
                        src={auth.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={auth.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{auth.title}</h4>
                    </Link>
                    <span>ERC-{auth.code}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="nft_coll ">
                <div className="nft_wrap">
                  <Skeleton width={"100%"} height={"200px"} />
                </div>
                <div className="nft_coll_pp">
                  <Skeleton
                    width={"60px"}
                    height={"60px"}
                    borderRadius={"999px"}
                  />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Skeleton width={"100px"} borderRadius={"8px"} />
                </div>
                <Skeleton width={"50px"} borderRadius={"8px"} />
              </div>
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
