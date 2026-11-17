import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [authorDetails, setAuthorDetails] = useState(null);

  async function getAuthorDetails() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
    );
    setAuthorDetails(data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    getAuthorDetails();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {authorDetails ? (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={authorDetails.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {authorDetails.title} #{authorDetails.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {authorDetails.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {authorDetails.likes}
                        </div>
                      </div>
                      <p>{authorDetails.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${authorDetails.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={authorDetails.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${authorDetails.ownerId}`}>
                                {authorDetails.ownerName}
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
                              <Link to={`/author/${authorDetails.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={authorDetails.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${authorDetails.creatorId}`}>
                                {authorDetails.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{authorDetails.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton width="100%" height="400px" />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        <Skeleton width="300px" height="20px" />
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          
                          
                        </div>
                        <div className="item_info_like">
                          
                          
                        </div>
                      </div>
                      <p><Skeleton width="300px" height="50px" /></p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={``}>
                                <Skeleton width="20px" height="20px" borderRadius="50%" />
                                
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={``}>
                                <Skeleton width="50px" />
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
                              <Link to={``}>
                                <Skeleton width="20px" height="20px" borderRadius="50%" />
                                
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={``}>
                                 <Skeleton width="50px" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <Skeleton width="25px" />
                          <span></span>
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
