import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function main() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
      );
      setItemDetails(data);
      setLoading(false);
    }
    setTimeout(() => {
      main();
    }, 2000);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {!loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={itemDetails.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {itemDetails.title} #{itemDetails.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {itemDetails.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {itemDetails.likes}
                        </div>
                      </div>
                      <p>{itemDetails.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemDetails.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetails.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails.ownerId}`}>
                                {itemDetails.ownerName}
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
                              <Link to={`/author/${itemDetails.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetails.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails.creatorId}`}>
                                {itemDetails.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{itemDetails.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className=" col-md-6 text-center">
                    <div
                      style={{
                        width: "100%",
                        height: "500px",
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        borderRadius: "7px",
                      }}
                      className=" img-fluid img-rounded mb-sm-30 nft-image"
                    ></div>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2
                        className="skeleton-box"
                        style={{
                          width: "50%",
                          height: "40px",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          borderRadius: "4px",
                        }}
                      ></h2>

                      <div className="item_info_counts">
                        <div
                          className="item_info_views skeleton-box"
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                        ></div>
                        <div
                          className="item_info_like"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            height: "30px",
                          }}
                        ></div>
                      </div>
                      <div
                        className="skeleton-box"
                        style={{
                          width: "100%",
                          height: "20px",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          borderRadius: "4px",
                          marginBottom: "20px",
                        }}
                      ></div>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6
                            style={{
                              width: "100px",
                              height: "15px",
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              borderRadius: "4px",
                            }}
                          ></h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <div
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                                  borderRadius: "100%",
                                }}
                                className="lazy skeleton-box"
                              ></div>
                              <i className="fa fa-check"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div
                          style={{ paddingTop: "70px" }}
                          className="de_tab_content"
                        >
                          <h6
                            style={{
                              width: "100px",
                              height: "15px",
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              borderRadius: "4px",
                            }}
                          ></h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <div
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                                  borderRadius: "100%",
                                }}
                                className="lazy skeleton-box"
                              ></div>
                              <i className="fa fa-check"></i>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <div
                          style={{
                            width: "100px",
                            height: "15px",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            borderRadius: "4px",
                            marginTop: "50px",
                            marginBottom: "15px",
                          }}
                        ></div>
                        <div
                          style={{ display: "flex" }}
                          className="nft-item-price"
                        >
                          <div
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              width: "30px",
                              borderRadius: "100%",
                              height: "30px",
                              marginRight: "10px",
                            }}
                          ></div>
                          <span
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              borderRadius: "4px",
                              width: "50px",
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
