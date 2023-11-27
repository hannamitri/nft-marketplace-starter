import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(null);
  const options = {
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  async function getData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollection(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

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
          {loading && collection ? (
            <OwlCarousel
              nav={true}
              margin={10}
              loop
              responsive={options.responsive}
            >
              {collection.map((data, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={data.nftImage}
                        className="lazy img-fluid h-100"
                        alt="nft-image"
                      ></img>
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={data.authorImage}
                        alt=""
                      ></img>
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{data.title}</h4>
                    </Link>
                    <div>ERC-{data.code}</div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel
              nav={true}
              margin={10}
              loop
              responsive={options.responsive}
            >
              {new Array(6).fill(0).map((_,index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <div className="skeleton--image skeleton-box"></div>
                  </div>
                  <div className="nft_coll_pp">
                    <div className="skeleton--icon skeleton-box"></div>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <div className="skeleton--title skeleton-box"></div>
                    <div className="skeleton--id skeleton-box" ></div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
