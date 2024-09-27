import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();
  const [nft, setNft] = useState([]);
  const [img, setImg] = useState();
  const URL = `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`;

  async function fetchNfts() {
    setImg(false);
    const { data } = await axios.get(URL);
    setNft(data);
    setImg(true);
  }

  useEffect(() => {
    fetchNfts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {img ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={nft.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
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
                              <img
                                className="lazy"
                                src={nft.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft.ownerId}`}>
                              {nft.ownerName}
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
                            <Link to={`/author/${nft.creatorId}`}>
                              <img
                                className="lazy"
                                src={nft.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft.creatorId}`}>
                              {nft.creatorName}
                            </Link>
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
            ) : (
              <div id="wrapper">
                <div className="no-bottom no-top" id="content">
                  <div id="top"></div>
                  <section aria-label="section" className="mt90 sm-mt-0">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 text-center">
                          <div
                            src={nftImage}
                            className="img-fluid img-rounded mb-sm-30 nft-image skeleton-box md:sm-5"
                            alt=""
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="item_info pt-4">
                            <h2 className="skeleton-box">Rainbow Style #194</h2>

                            <div className="item_info_counts">
                              <div className="item_info_views skeleton-box">
                                100
                              </div>
                              <div className="item_info_like skeleton-box">
                                74
                              </div>
                            </div>
                            <p className="skeleton-box">
                              doloremque laudantium, totam rem aperiam, eaque
                              ipsa quae ab illo inventore veritatis et quasi
                              architecto beatae vitae dicta sunt explicabo.
                            </p>
                            <div className="d-flex flex-row">
                              <div className="mr40">
                                <div className="item_author">
                                  <div className="author_list_pp">
                                    <div
                                      className="lazy skeleton-dp  skeleton-box"
                                      alt=""
                                    />
                                  </div>
                                  <div className="author_list_info ">
                                    <div to="/author" className="skeleton-box">
                                      Monica Lucas
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div></div>
                            </div>
                            <div className="de_tab tab_simple">
                              <div className="de_tab_content">
                                <div className="item_author">
                                  <div className="author_list_pp">
                                    <div
                                      className="lazy skeleton-dp  skeleton-box"
                                      alt=""
                                    />
                                  </div>
                                  <div className="author_list_info">
                                    <div to="/author" className="skeleton-box">
                                      Monica Lucas
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="spacer-40"></div>
                              <div className="nft-item-price skeleton-box">
                                <div className="">1.85</div>
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
