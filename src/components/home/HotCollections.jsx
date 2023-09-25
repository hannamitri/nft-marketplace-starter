import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactOwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNFTs() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setNFTs(data);

    setLoading(false);
  }

  useEffect(() => {
    fetchNFTs();
  }, [loading]);

  function renderNFTs() {
    return loading ? (
      <ReactOwlCarousel
        className="owl-theme"
        loop
        margin={10}
        nav
        items={4}
        dots={false}
        responsive={{
          1200: { items: 4 },
          992: { items: 3 },
          768: { items: 2 },
          0: { items: 1 },
        }}
      >
        {new Array(6).fill(0).map((_, index) => (
          <div className="nft_coll" key={index}>
            <div className="nft_wrap">
              <a href="/">
                <div
                  className="skeleton-box"
                  style={{ width: "100%", height: "200px" }}
                ></div>
              </a>
            </div>
            <div className="nft_coll_pp">
              <a href="/">
                <div
                  className="skeleton-box"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                ></div>
              </a>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <a href="/">
                <div
                  className="skeleton-box"
                  style={{ width: "100px", height: "20px" }}
                ></div>
              </a>
              <br />
              <div
                className="skeleton-box"
                style={{ width: "60px", height: "20px" }}
              ></div>
            </div>
          </div>
        ))}
      </ReactOwlCarousel>
    ) : (
      <ReactOwlCarousel
        className="owl-theme"
        loop
        margin={10}
        nav
        items={4}
        dots={false}
        responsive={{
          1200: { items: 4 },
          992: { items: 3 },
          768: { items: 2 },
          0: { items: 1 },
        }}
      >
        {NFTs.map((NFT, index) => (
          <div className="nft_coll" key={index}>
            <div className="nft_wrap">
              <Link to="/item-details">
                <img src={NFT.nftImage} className="lazy img-fluid" alt="" />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to="/author">
                <img className="lazy pp-coll" src={NFT.authorImage} alt="" />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <h4>{NFT.title}</h4>
              </Link>
              <span>ERC-{NFT.code}</span>
            </div>
          </div>
        ))}
      </ReactOwlCarousel>
    );
  }

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
          {renderNFTs()}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
