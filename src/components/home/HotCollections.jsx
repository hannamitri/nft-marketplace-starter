//  https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";

const HotCollections = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState();
  async function hotData() {
    setLoading(false);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setNfts(data);
    setLoading(true);
  }
  useEffect(() => {
    hotData();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>{" "}
          {loading ? (
            <OwlCarousel className="owl-theme" {...options}>
              {nfts.map((nft, index) => (
                <div className="nft_coll" key={index}>
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
              ))}
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel className="owl-theme" {...options}>
                {new Array(4).fill(0).map((_, index) => (
                
                 <div
                   className="nft_coll "
                   key={index}
                 >
                   <div className="nft_wrap">
                     <div
                       className="lazy img-fluid skeleton-box"
                       style={{ width: "100%", height: 200 }}
                     />
                   </div>
                   <div className="nft_coll_pp">
                     <div
                       className="lazy pp-coll skeleton-box"
                       style={{
                         width: 50,
                         height: 50,
                         borderRadius: 999,
                         borderWidth: 5,
                         borderStyle: "solid",
                         borderColor: "white",
                       }}
                     ></div>
                   </div>
                   <div
                     className="nft_coll_info"
                     style={{
                       display: "flex",
                       justifyContent: "center",
                       alignItems: "center",
                       flexDirection: "column",
                     }}
                   >
                     <div
                       className="skeleton-box"
                       style={{ width: 150, marginBottom: 12 }}
                     ></div>
                     <div
                       className="skeleton-box"
                       style={{ width: 40 }}
                     ></div>
                   </div>
                 </div>
               
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
