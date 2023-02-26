import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactOwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  const fetchHotCollections = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(data);
    console.log("loaded");
  };

  useEffect(() => {
    fetchHotCollections();
  }, []);

  const carouselOptions = {
    loop: true,
    nav: true,
    items: 4,
    margin: 10,
    responsive: {
      1200: { items: 4 },
      768: { items: 3 },
      470: { items: 2 },
      0: { items: 1 },
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
          {collections.length ? (
            <ReactOwlCarousel {...carouselOptions}>
              {collections.map((collection) => (
                <div className="nft_coll" key={collection.id}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${collection.nftId}`}>
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
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
                    <Link to="/explore">
                      <h4>Pinky Ocean</h4>
                    </Link>
                    <span>ERC-192</span>
                  </div>
                </div>
              ))}
            </ReactOwlCarousel>
          ) : (
            <>
              <ReactOwlCarousel {...carouselOptions}>
                {new Array(6).fill(0).map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Link to={`/item-details`}>
                        <Skeleton width={"100%"} height={"100%"} />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author`}>
                        <Skeleton
                          width={"60px"}
                          height={"60px"}
                          borderRadius={"100%"}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <Skeleton width={"200px"} height={"20px"} />
                      </Link>
                      <br />
                      <Skeleton width={"100px"} height={"20px"} />
                    </div>
                  </div>
                ))}
              </ReactOwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
