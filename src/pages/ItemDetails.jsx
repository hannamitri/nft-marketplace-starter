import React, { useEffect, useState  } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setItemDetails(data);
    setIsLoading(false);
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
          {isLoading ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton height="100%" width="100%" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      <Skeleton height="50%" width="50%" />
                    </h2>
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <Skeleton />
                      </div>
                      <div className="item_info_like">
                        <Skeleton />
                      </div>
                    </div>
                    <p>
                      <Skeleton height={90} width="100%" />
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to="/author">
                              <Skeleton height={50} borderRadius="50%" />
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Skeleton width={100} />
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
                              <Skeleton height={50} borderRadius="50%" />
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Skeleton width={100} />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <span>
                          <Skeleton width={100} />
                        </span>
                      </div>
                    </div>
                    </div>
                    </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={itemDetails.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{itemDetails.title}</h2>

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
                            <Link to="/author">
                              <img
                                className="lazy"
                                src={itemDetails.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to="/author">{itemDetails.ownerName}</Link>
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
                                src={itemDetails.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to="/author">{itemDetails.creatorName}</Link>
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
              </div>
                )}
                </div>
              </section>
            </div>
          </div>
        );
      };

export default ItemDetails;
