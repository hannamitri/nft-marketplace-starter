import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

export default function HotCollections() {
  const [col, setCol] = useState([]);
  const [skelLoad, setSkelLoad] = useState();

  async function fetchData() {
    setSkelLoad(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setSkelLoad(false);
    setCol(data);
  }

  useEffect(() => {
    fetchData();
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
          {skelLoad ? (
            new Array(1).fill(0).map((index) => (
              <OwlCarousel loop items={4} nav dots={false} key={index}>
              <div className="nft_skeleton">
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton height="93%" width="100%" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton borderRadius={50} height={50} width={50} />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <h4>
                      <Skeleton height={20} width={100} />
                    </h4>
                    <span>
                      <Skeleton height={20} width={60} />
                    </span>
                  </div>
                </div>
              </div>
            </OwlCarousel>
            ))
          ) : (
            <OwlCarousel
              loop
              nav
              dots={false}
              responsive={{
                1200: { items: 4 },
                900: { items: 3 },
                600: { items: 2 },
                0: { items: 1 },
              }}
            >
              {col.map((collection, index) => (
                <div key={index}>
                  <div className="nft_coll">
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
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
}
