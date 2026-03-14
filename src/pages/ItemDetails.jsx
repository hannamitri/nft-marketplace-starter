import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";
import { normalize } from "../utils/normalize";


const BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=";

const ItemDetails = () => {
  const { id } = useParams();
  //USE STATE
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getDetails() {
    const response = await axios.get(BASE_URL + id);
    const normalData=normalize(response.data);
    setDetails(normalData);
    setLoading(false);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    getDetails();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <div className="image-wrapper">
                  {loading ? (
                    <Skeleton
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      width="100%"
                      height="100%"
                    />
                  ) : (
                    <img
                      src={details.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {loading ? (
                      <Skeleton width="300px" />
                    ) : (
                      <>
                        {details.title} #{details.tag}
                      </>
                    )}
                  </h2>
                  <div className="item_info_counts">
                    {loading ? (
                      <>
                        <Skeleton width="80px" height="30px" />
                        <Skeleton width="80px" height="30px" />
                      </>
                    ) : (
                      <>
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {details.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {details.likes}
                        </div>
                      </>
                    )}
                  </div>
                  {loading ? (
                    <Skeleton width="460px" height="80px" />
                  ) : (
                    <p>{details.description}</p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`../author/${details.ownerId}`}>
                            <div className="image-wrapper">
                              {loading ? (
                                <Skeleton
                                  width="100%"
                                  height="100%"
                                  borderRadius="100%"
                                />
                              ) : (
                                <>
                                  <img
                                    className="lazy"
                                    src={details.ownerImage}
                                    alt=""
                                  />
                                  <i className="fa fa-check"></i>
                                </>
                              )}
                            </div>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`../author/${details.ownerId}`}>
                            {loading ? (
                              <Skeleton width="125px" height="20px" />
                            ) : (
                              <>{details.ownerName}</>
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
                          <Link to={`../author/${details.creatorId}`}>
                            <div className="image-wrapper">
                              {loading ? (
                                <Skeleton
                                  width="100%"
                                  height="100%"
                                  borderRadius="100%"
                                />
                              ) : (
                                <>
                                  <img
                                    className="lazy"
                                    src={details.creatorImage}
                                    alt=""
                                  />
                                  <i className="fa fa-check"></i>
                                </>
                              )}
                            </div>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`../author/${details.creatorId}`}>
                            {loading ? (
                              <Skeleton width="125px" height="20px" />
                            ) : (
                              <>{details.creatorName}</>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {loading ? (
                        <Skeleton width="75px" height="20px" />
                      ) : (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{details.price}</span>
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