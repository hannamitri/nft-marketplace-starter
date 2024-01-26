import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collection, setCollection] = useState([]);
  const [skeleton, setSkeleton] = useState(true);

  async function fetchUsers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollection(data);
    setSkeleton(false);
  }

  useEffect(() => {
    fetchUsers();
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
          {skeleton ? (
            new Array(1).fill(0).map((_, index) => (
              <OwlCarousel
                key={index}
                loop
                nav
                dots={false}
                responsive={{
                  0: { items: 1 },
                  600: { items: 2 },
                  900: { items: 3 },
                  1200: { items: 4 },
                }}
              >
                <div className="nft_skeleton">
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton height="100%" width="100%" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton borderRadius={50} height={50} width={50} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <h4>
                        <Skeleton height={20} width={100} borderRadius={4} />
                      </h4>
                      <span>
                        <Skeleton height={20} width={60} borderRadius={4} />
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
                0: { items: 1 },
                600: { items: 2 },
                900: { items: 3 },
                1200: { items: 4 },
              }}
            >
              {collection.map((item, index) => (
                <div
                  key={index}
                  data-aos="fade-in"
                  data-aos-anchor-placement="top-bottom"
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
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
