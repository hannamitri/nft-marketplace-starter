import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

AOS.init();

const HotCollections = () => {
  const [nfts, setNFTS] = useState([]);
  const [loading, setLoading] = useState();

  async function getInfo() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setNFTS(data);
  }

  useEffect(() => {
    getInfo();
    setLoading(false);
  }, [loading]);

  const options = {
    loop: true,
    margin: 10,
    items: 4,
    dots: false,
    nav: true,
    className: "owl-theme",
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
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
              <h2
                data-aos="fade"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="true"
              >
                Hot Collections
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {nfts.length > 0 ? (
            <OwlCarousel {...options}>
              {nfts.map((nft) => (
                <div
                  key={nft.id}
                  data-aos="fade"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                  data-aos-once="true"
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${nft.nftId}`}>
                        <img
                          src={nft.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${nft.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={nft.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{nft.title}</h4>
                      </Link>
                      <span>ERC-{nft.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel {...options}>
              {new Array(1).fill(0).map((_, index) => (
                <div className="" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width={270} height={150} borderRadius={1} />
                    </div>
                    <div className="nft_coll_pp">
                      <div className="lazy pp-coll">
                        <Skeleton width={50} height={50} borderRadius={50} />
                      </div>
                      <i className="fa fa-check" style={{ zIndex: 999 }}></i>
                    </div>
                    <div className="nft_coll_info">
                      <h4>
                        <Skeleton width={140} height={20} borderRadius={1} />
                      </h4>
                      <span>
                        <Skeleton width={90} height={20} borderRadius={1} />
                      </span>
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
