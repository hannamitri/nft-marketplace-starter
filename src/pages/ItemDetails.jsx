import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton, { ItemDetailSkeleton } from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [loadSkeleton, setLoadSkeleton] = useState();
  const [loading, setLoading] = useState([]);
  const { id } = useParams();

  async function fetchNftDetails() {
    setLoadSkeleton(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setLoading(data);
    setLoadSkeleton(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNftDetails();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loadSkeleton ? (
                  <Skeleton width={"100%"} height={"100%"} />
                ) : (
                  <img
                    src={loading.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loadSkeleton ? (
                    <Skeleton
                      width={"100%"}
                      maxWidth={"260px"}
                      height={"50px"}
                      className="skeleton-box"
                    />
                  ) : (
                    <h2>
                      {loading.title} #{loading.tag}
                    </h2>
                  )}
                  {loadSkeleton ? (
                    <>
                      <ItemDetailSkeleton />
                    </>
                  ) : (
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {loading.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {loading.likes}
                      </div>
                    </div>
                  )}
                  {loadSkeleton ? (
                    <Skeleton />
                  ) : (
                    <>
                      <p>{loading.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${loading.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={loading.ownerImage}
                                  alt=""
                                />

                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${loading.ownerId}`}>
                                {loading.ownerName}
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
                              <Link to={`/author/${loading.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={loading.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${loading.ownerId}`}>
                                {loading.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{loading.price}</span>
                        </div>
                      </div>
                    </>
                  )}
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
