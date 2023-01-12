import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@mui/material";

const ItemDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [nftData, setNftData] = useState([]);

  async function loadData() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id.replace(
        ":",
        ""
      )}`
    );
    setNftData(data);
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
  }, []);

  return (
    <>
      {loading ? (
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width="100%"
                      height={400}
                      style={{ marginBottom: "20px" }}
                    ></Skeleton>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton
                        style={{ marginBottom: "20px" }}
                        variant="rectangular"
                        animation="wave"
                        width="80%"
                        height={40}
                      />
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                        </div>
                      </div>
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width="90%"
                        height={100}
                      />
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/:${nftData.ownerId}`}>
                                <Skeleton
                                  variant="circular"
                                  animation="wave"
                                  width={50}
                                  height={50}
                                ></Skeleton>
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Skeleton
                                variant="rectangular"
                                animation="wave"
                                width={60}
                                height={20}
                              />
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                variant="circular"
                                animation="wave"
                                width={50}
                                height={50}
                              ></Skeleton>
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton
                                variant="rectangular"
                                animation="wave"
                                width={60}
                                height={20}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          width={120}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <img
                      src={nftData.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{`${nftData.title} #${nftData.tag}`}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nftData.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nftData.likes}
                        </div>
                      </div>
                      <p>{nftData.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/:${nftData.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={nftData.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/:${nftData.ownerId}`}>
                                {nftData.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/:${nftData.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={nftData.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/:${nftData.creatorId}`}>
                                {nftData.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{nftData.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetails;
