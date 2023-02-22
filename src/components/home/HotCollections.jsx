import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HotCollections = () => {
  const [NFT, setNFT] = useState([]);
  const [loading, setLoading] = useState(false);

  async function NFTHotCollections() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setNFT(data);
    setLoading(false);
  }

  useEffect(() => {
    NFTHotCollections();
  }, []);

  const settings = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    autoplay: false,
    navText: ["<", ">"],
    smartSpeed: 500,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
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
          {!loading ? (
            <OwlCarousel {...settings}>
              {new Array(4).fill(0).map((_, index) => (
                <div className="" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width={310} height={240} borderRadius={1} />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width={60} height={60} borderRadius={55} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>
                          <Skeleton width={126} height={20} borderRadius={1} />
                        </h4>
                      </Link>
                      <span>
                        <Skeleton width={90} height={20} borderRadius={1} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel {...settings}>
              {NFT.map((nft, index) => (
                <div className="" key={index}>
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
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
