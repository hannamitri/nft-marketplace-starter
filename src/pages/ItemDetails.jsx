import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
const ItemDetails = () => {
  const [isData, setIsData] = useState("");
  const { id } = useParams();

  async function fetchData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setIsData(data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {isData ? (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={isData.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{isData.title}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {isData.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {isData.likes}
                        </div>
                      </div>
                      <p>{isData.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/author">
                                <img
                                  className="lazy"
                                  src={isData.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">{isData.ownerName}</Link>
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
                              <Link to="/author">
                                <img
                                  className="lazy"
                                  src={isData.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">{isData.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{isData.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton width="100%" height="100%" />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton width="300px" height="40px" />

                      <div className="item_info_counts">
                        <Skeleton width="80px" height="30px" />
                        <Skeleton width="80px" height="30px" />
                      </div>
                      <Skeleton width="100%" height="80px" />
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                            </div>
                            <div className="author_list_info">
                              <Skeleton width="125px" height="20px" />
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
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                            </div>
                            <div className="author_list_info">
                              <Skeleton width="125px" height="20px" />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <Skeleton width="75px" height="20px" />
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
