import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import axios from "axios";
const HotCollections = () => {
  const [hotCollectionsData, setHotCollectionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollectionsData(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const options = {
    items: 4,
    nav: true,
    loop: true,
    margin: 10,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 4,
      },
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
          {loading ? (
            <>
              <OwlCarousel {...options}>
                {new Array(7).fill(0).map((_, index) => (
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width={500} height={150} borderRadius={1} />
                    </div>
                    <div className="nft_coll_pp">
                      <div className="lazy pp-coll">
                        <Skeleton width={55} height={55} borderRadius={50} />
                      </div>
                    </div>
                    <div className="nft_coll_info">
                      <h4>
                        <Skeleton width={125} height={20} borderRadius={1} />
                      </h4>
                      <span>
                        <Skeleton width={90} height={18} borderRadius={1} />
                      </span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          ) : (
            <OwlCarousel {...options}>
              {hotCollectionsData.map((item) => (
                <div key={item.id}>
                  <div className="nft_coll">
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
