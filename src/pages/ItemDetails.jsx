import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const [NFT, setNFT] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // set initial value to false

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
      )
      .then((res) => {
        setNFT(res.data);
        setIsLoading(false); // set to false after getting data
      });
  }, [isLoading]);

  console.log(NFT);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {isLoading ? (
                  <div
                    className="skeleton-box"
                    style={{ width: "100%", height: "100%" }}
                  ></div>
                ) : (
                  <img
                    src={NFT.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {isLoading ? (
                    <div
                      className="skeleton-box"
                      style={{ width: "300px", height: "40px" }}
                    ></div>
                  ) : (
                    <h2>
                      {NFT.title} #{NFT.tag}
                    </h2>
                  )}

                  <div className="item_info_counts">
                    {isLoading ? (
                      <>
                        <div
                          className="skeleton-box"
                          style={{ width: "80px", height: "30px" }}
                        ></div>
                        <div
                          className="skeleton-box"
                          style={{ width: "80px", height: "30px" }}
                        ></div>
                      </>
                    ) : (
                      <>
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {NFT.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {NFT.likes}
                        </div>
                      </>
                    )}
                  </div>
                  {isLoading ? (
                    <div
                      className="skeleton-box"
                      style={{ width: "100%", height: "80px" }}
                    ></div>
                  ) : (
                    <p>{NFT.description}</p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${NFT.ownerId}`}>
                            {isLoading ? (
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              ></div>
                            ) : (
                              <>
                                <img
                                  className="lazy"
                                  src={NFT.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </>
                            )}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${NFT.ownerId}`}>
                            {isLoading ? (
                              <div
                                className="skeleton-box"
                                style={{ width: "125px", height: "20px" }}
                              ></div>
                            ) : (
                              NFT.ownerName
                            )}
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
                          <Link to={`/author/${NFT.creatorId}`}>
                            {isLoading ? (
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              ></div>
                            ) : (
                              <>
                                <img
                                  className="lazy"
                                  src={NFT.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </>
                            )}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${NFT.creatorId}`}>
                            {isLoading ? (
                              <div
                                className="skeleton-box"
                                style={{ width: "125px", height: "20px" }}
                              ></div>
                            ) : (
                              NFT.creatorName
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {isLoading ? (
                        <div
                          className="skeleton-box"
                          style={{ width: "75px", height: "20px" }}
                        ></div>
                      ) : (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{NFT.price}</span>
                        </>
                      )}
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
