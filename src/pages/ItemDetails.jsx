import React, { useState, useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { nftId } = useParams();

  useEffect(() => {
    async function getDetails() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
      );
      setDetails(data);
      return data;
    }

    async function load() {
      const results = await getDetails();
      setDetails(results);
      setLoading(false);
    }
    load();
  }, [nftId]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
                    <Skeleton
                      width="500px"
                      height="500px"
                      src=""
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton width="500px" height="50px" />

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          <Skeleton width="20px" height="10px" />
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          <Skeleton width="20px" height="10px" />
                        </div>
                      </div>
                      <p>
                        <Skeleton width="600px" height="50px" />
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <Skeleton width="50px" />
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${details.ownerId}`}>
                                <Skeleton
                                  width="50px"
                                  height="50px"
                                  className="lazy"
                                  src={details.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${details.ownerId}`}>
                                <Skeleton width="100px" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>
                            <Skeleton width="50px" />
                          </h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${details.creatorId}`}>
                                <Skeleton
                                  width="50px"
                                  height="50px"
                                  className="lazy"
                                  src={details.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${details.creatorId}`}>
                                <Skeleton width="100px" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>
                          <Skeleton width="50px" />
                        </h6>
                        <div className="nft-item-price">
                          <Skeleton
                            width="25px"
                            height="25px"
                            src={EthImage}
                            alt=""
                          />
                          <span>
                            <Skeleton width="75px" height="50px" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={details.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {details.title} #{details.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {details.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {details.likes}
                        </div>
                      </div>
                      <p>
                        doloremque laudantium, totam rem aperiam, eaque ipsa
                        quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo.
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${details.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={details.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${details.ownerId}`}>
                                {details.ownerName}
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
                              <Link to={`/author/${details.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={details.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${details.creatorId}`}>
                                {details.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{details.price}</span>
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
