import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { nftId } = useParams(); 
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNft = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        setNft(response.data);
      } catch (error) {
        console.error("Error fetching NFT:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNft();
  }, [nftId]);

  const skeletonStyle = {
    background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite linear",
    borderRadius: "4px",
  };

  const skeletonImage = {
    ...skeletonStyle,
    width: "100%",
    height: "400px",
    borderRadius: "12px",
  };

  const skeletonCircle = {
    ...skeletonStyle,
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  };

  const skeletonText = (width = "80%") => ({
    ...skeletonStyle,
    height: "16px",
    width,
    margin: "10px 0",
  });

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div style={skeletonImage}></div>
                </div>
                <div className="col-md-6">
                  <div style={{ padding: "20px" }}>
                    <div style={skeletonText("60%")}></div>
                    <div style={skeletonText("40%")}></div>
                    <div style={skeletonText("90%")}></div>
                    <div className="d-flex flex-row" style={{ marginTop: "20px" }}>
                      <div className="mr40" style={{ display: "flex", alignItems: "center" }}>
                        <div style={skeletonCircle}></div>
                        <div style={{ marginLeft: "10px", flex: 1 }}>
                          <div style={skeletonText("50%")}></div>
                          <div style={skeletonText("30%")}></div>
                        </div>
                      </div>
                    </div>

                    <div className="de_tab tab_simple mt-4">
                      <div className="de_tab_content">
                        <div style={skeletonCircle}></div>
                        <div style={{ marginTop: "10px" }}>
                          <div style={skeletonText("50%")}></div>
                          <div style={skeletonText("30%")}></div>
                        </div>
                      </div>

                      <div className="spacer-40"></div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ ...skeletonCircle, marginRight: "10px" }}></div>
                        <div style={skeletonText("20%")}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <style>{`
              @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }
            `}</style>
          </section>
        </div>
      </div>
    );
  }

  if (!nft) return <p style={{ textAlign: "center" }}>NFT not found</p>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nft.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={nft.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{nft.title}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nft.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nft.likes}
                    </div>
                  </div>
                  <p>{nft.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.ownerId}`}>
                            <img className="lazy" src={nft.ownerImage} alt="" />
                            {nft.ownerVerified && <i className="fa fa-check"></i>}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.ownerId}`}>{nft.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple mt-4">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.creatorId}`}>
                            <img className="lazy" src={nft.creatorImage} alt="" />
                            {nft.creatorVerified && <i className="fa fa-check"></i>}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.creatorId}`}>{nft.creatorName}</Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{nft.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;