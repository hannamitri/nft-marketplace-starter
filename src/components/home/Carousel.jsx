import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function Carosuel() {
  const [posts, nftPost] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAuthorData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    nftPost(data);
  }

  useEffect(() => {
    fetchAuthorData();
    setLoading(false);
  }, []);

  const responsiveOptions = {
    0: { items: 1 },
    768: { items: 2 },
    992: { items: 3 },
    1200: { items: 4 },
  };

  return (
    <>
      {loading ? (
        <OwlCarousel
          className="owl-theme owl-drag owl-loaded"
          dots={false}
          margin={10}
          responsive={responsiveOptions}
          loop
          nav
        >
          {new Array(4).fill().map((_, index) => (
            <div className="nft_coll" key={index}>
              <div className="nft_wrap ">
                <Link to={`/item-details/}`}>
                  <div
                    src="/"
                    className="lazy img-fluid skeleton-box "
                    style={{ width: `100%`, height: "200px" }}
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft_coll_pp ">
                <Link to={`/author/`}>
                  <div
                    className="lazy pp-coll skeleton-box "
                    style={{
                      width: `50px`,
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    src="/"
                    alt=""
                  />
                </Link>
                <i className="fa fa-check"></i>
              </div>
              <div
                className="nft_coll_info"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Link to="/explore">
                  <h4
                    className="skeleton-box"
                    style={{ width: `100px`, height: "20px" }}
                  ></h4>
                </Link>
                <span
                  className="skeleton-box"
                  style={{ width: `60px`, height: "20px" }}
                ></span>
              </div>
            </div>
          ))}
        </OwlCarousel>
      ) : (
        <OwlCarousel
          className="owl-theme owl-drag owl-loaded"
          dots={false}
          margin={10}
          responsive={responsiveOptions}
          loop
          nav
        >
          {posts.map((post) => (
            <div className="nft_coll" key={post.id}>
              <div className="nft_wrap">
                <Link to={`/item-details/${post.nftId}`}>
                  <img src={post.nftImage} className="lazy img-fluid" alt="" />
                </Link>
              </div>
              <div className="nft_coll_pp">
                <Link to={`/author/${post.authorId}`}>
                  <img className="lazy pp-coll" src={post.authorImage} alt="" />
                </Link>
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
                <Link to="/explore">
                  <h4>{post.title}</h4>
                </Link>
                <span>ERC-{post.code}</span>
              </div>
            </div>
          ))}
        </OwlCarousel>
      )}
    </>
  );
}
