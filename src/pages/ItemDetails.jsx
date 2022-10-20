import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { useState } from "react";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const { itemId } = location.state;

  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(undefined);

  async function getData() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
    );
    setItem(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading === true ? (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton width={"100%"} height={505} borderRadius={0} />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton width={300} height={45} borderRadius={0} />

                      <div className="item_info_counts">
                        <Skeleton width={80} height={30} borderRadius={0} />

                        <Skeleton width={80} height={30} borderRadius={0} />
                      </div>
                      <Skeleton width={525} height={100} borderRadius={0} />
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width={50}
                                height={50}
                                borderRadius={999}
                              />
                            </div>
                            <div className="author_list_info">
                              <Skeleton
                                width={100}
                                height={20}
                                borderRadius={0}
                              />
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
                                width={50}
                                height={50}
                                borderRadius={999}
                              />
                            </div>
                            <div className="author_list_info">
                              <Skeleton
                                width={100}
                                height={20}
                                borderRadius={0}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <Skeleton width={90} height={35} borderRadius={0} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={item.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {item.title} #{item.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      </div>
                      <p>{item.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link
                                to={`/author/${item.ownerId}`}
                                state={{ authorId: item.ownerId }}
                              >
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link
                                to={`/author/${item.ownerId}`}
                                state={{ authorId: item.ownerId }}
                              >
                                {item.ownerName}
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
                              <Link
                                to={`/author/${item.creatorId}`}
                                state={{ authorId: item.creatorId }}
                              >
                                <img
                                  className="lazy"
                                  src={item.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link
                                to={`/author/${item.creatorId}`}
                                state={{ authorId: item.creatorId }}
                              >
                                {item.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{item.price}</span>
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
