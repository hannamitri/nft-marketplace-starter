import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
// import AuthorImage from "../images/author_thumbnail.jpg";
// import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nftDetails, setNftDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNftDetails() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      console.log("data fetch", data);
      setNftDetails(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchNftDetails();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">

            {loading ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <div
                    className="skeleton-box"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div
                      className="skeleton-box"
                      style={{
                        width: "300px",
                        height: "40px",
                      }}
                    />

                    <div className="item_info_counts">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "80px",
                          height: "30px",
                        }}
                      />
                      <div
                        className="skeleton-box"
                        style={{
                          width: "80px",
                          height: "30px",
                        }}
                      />
                    </div>
                    <div
                      className="skeleton-box"
                      style={{
                        width: "100%",
                        height: "80px",
                      }}
                    />
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nftDetails.ownerId}`}>
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              />
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nftDetails.ownerId}`}>
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "125px",
                                  height: "20px",
                                }}
                              />
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
                            <Link to={`/author/${nftDetails.creatorId}`}>
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              />
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nftDetails.creatorId}`}>
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "125px",
                                  height: "20px",
                                }}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "75px",
                            height: "20px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={nftDetails.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {nftDetails.title} #{nftDetails.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {nftDetails.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {nftDetails.likes}
                      </div>
                    </div>
                    <p>
                      doloremque laudantium, totam rem aperiam, eaque ipsa quae
                      ab illo inventore veritatis et quasi architecto beatae
                      vitae dicta sunt explicabo.
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nftDetails.ownerId}`}>
                              <img
                                className="lazy"
                                src={nftDetails.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nftDetails.ownerId}`}>
                              {nftDetails.ownerName}
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
                            <Link to={`/author/${nftDetails.creatorId}`}>
                              <img
                                className="lazy"
                                src={nftDetails.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nftDetails.creatorId}`}>
                              {nftDetails.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{nftDetails.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
