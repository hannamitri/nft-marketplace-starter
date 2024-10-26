import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";

import "../css/ItemDetails.css";

const ItemDetails = () => {
  const [loading, setLoading] = useState(true);
  const [nftData, setNFTData] = useState({});
  let { id } = useParams();

  async function fetchNFTData() {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );

    setNFTData(response.data);
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNFTData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <div className="skeleton skeleton__nft" alt="" />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2 className="skeleton skeleton__box"></h2>

                      <div className="skeleton__metric-holder">
                        <div className="skeleton__metric-box"></div>
                        <div className="skeleton__metric-box"></div>
                      </div>
                      <p className="skeleton__description"></p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="skeleton__pfp"></div>

                            <div className="skeleton__name"></div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="skeleton__pfp"></div>

                            <div className="skeleton__name"></div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="skeleton__price"></div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={nftData.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {nftData.title} #{nftData.tag}
                      </h2>

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
                              <Link to={"/author/" + nftData.ownerId}>
                                <img
                                  className="lazy"
                                  src={nftData.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={"/author/" + nftData.ownerId}>
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
                              <Link to={"/author/" + nftData.creatorId}>
                                <img
                                  className="lazy"
                                  src={nftData.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={"/author/" + nftData.creatorId}>
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
