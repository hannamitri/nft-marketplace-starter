import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  function renderNFTs() {
    return loading ? (
      <Slider {...settings}>
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
      </Slider>
    ) : (
      <Slider {...settings}>
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
      </Slider>
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
