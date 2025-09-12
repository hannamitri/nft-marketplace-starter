import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ItemDetails = () => {
  const { nftId } = useParams();
  console.log(nftId)
  const [nftData, setNftData] = useState(null);
  const isLoading =!nftData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        setTimeout(() => {
          setNftData(data);
          window.scrollTo(0, 0);
        }, 2000);
      } catch (error) {
        console.error("Error fetching NFT item:", error);
      }
    };
    fetchData();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <SkeletonTheme baseColor="#e1e1e1" highlightColor="#f2f2f2">
              {isLoading ? (
                <div className="row">
                  {/* Skeleton Left Column */}
                  <div className="col-md-6 text-center">
                    <Skeleton height={400} width="100%" />
                  </div>

                  {/* Skeleton Right Column */}
                  <div className="col-md-6">
                    <Skeleton height={40} width="60%" />
                    <div className="item_info_counts mt-3">
                      <Skeleton width={60} height={20} style={{ marginRight: 10 }} />
                      <Skeleton width={60} height={20} />
                    </div>
                    <Skeleton count={4} className="mt-3" />

                    <div className="mt-4 d-flex align-items-center">
                      <Skeleton circle height={50} width={50} />
                      <div className="ml-3">
                        <Skeleton width={100} />
                      </div>
                    </div>

                    <div className="mt-4 d-flex align-items-center">
                      <Skeleton circle height={50} width={50} />
                      <div className="ml-3">
                        <Skeleton width={100} />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Skeleton width={80} height={25} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row">
                  {/* Left Image Section */}
                  <div className="col-md-6 text-center">
                    <img
                      src={nftData.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt={nftData.title}
                    />
                  </div>

                  {/* Right Info Section */}
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{`${nftData.title} #${nftData.tag}`}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i> {nftData.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i> {nftData.likes}
                        </div>
                      </div>

                      <p>{nftData.description}</p>

                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftData.ownerId || ""}`}>
                                <img
                                  className="lazy"
                                  src={nftData.creatorImage}
                                  alt={nftData.owner}
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftData.ownerId || ""}`}>
                                {nftData.owner}
                              </Link>
                              <div>
                                <i style={{ fontSize: "20px" }}>
                                  <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    className="fa-arrow-left"
                                  />
                                </i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <br />
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftData.creatorId || ""}`}>
                                <img src={nftData.ownerImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftData.creatorId || ""}`}>
                                {nftData.creatorName || "Unknown"}
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="spacer-40"></div>

                        <h6>Price</h6>
                        <div className="nft-item-price d-flex align-items-center">
                          <img src={EthImage} alt="ETH" />
                          <span>{nftData.price} ETH</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SkeletonTheme>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;