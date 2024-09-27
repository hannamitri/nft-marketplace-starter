import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-owl-carousel";
import ReactOwlCarousel from "react-owl-carousel";
AOS.init();

const HotCollections = () => {
  const [nfts, setNfts] = useState([]);
  const [img, setImg] = useState(true);

  useEffect(() => {
    async function fetchNFT() {
      setImg(false);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      );
      setNfts(data);
      setImg(true);
    }
    fetchNFT();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
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

  return (
    <>
      <section
        id="section-collections"
        className="no-bottom"
        data-aos="fade-in"
        data-aos-delay="300"
        data-aos-duration="500"
        data-aos-easing="ease-in"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
              <div className="navigation-wrapper">
                <>
                  <ReactOwlCarousel className="" {...options}>
                    {!img
                      ? nfts.map((nfts) => (
                          <div className="">
                            <div className="nft_coll" key={nfts.id}>
                              <div className="nft_wrap">
                                <Link to={`/item-details/${nfts.nftId}`}>
                                  <img
                                    src={nfts.nftImage}
                                    className="lazy img-fluid"
                                    alt=""
                                  />
                                </Link>
                              </div>
                              <div className="nft_coll_pp">
                                <Link to={`/author/${nfts.authorId}`}>
                                  <img
                                    className="lazy pp-coll"
                                    src={nfts.authorImage}
                                    alt=""
                                  />
                                </Link>
                                <i className="fa fa-check"></i>
                              </div>
                              <div className="nft_coll_info">
                                <Link to="/explore">
                                  <h4>{nfts.title}</h4>
                                </Link>
                                <span>ERC-{nfts.code}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      : new Array(4).fill(0).map((_, index) => (
                          <div
                            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                            key={index}
                          >
                            <div className="nft_coll">
                              <div className="nft_wrap__skeleton skeleton-box"></div>
                              <div className="nft_coll_pp__skeleton skeleton-box"></div>
                              <div className="flex-col">
                                <div className="nft_coll_info__skeleton skeleton-box"></div>
                                <br />
                                <div className="nft_coll_info__skeleton2 skeleton-box"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                  </ReactOwlCarousel>
                </>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};



export default HotCollections;
