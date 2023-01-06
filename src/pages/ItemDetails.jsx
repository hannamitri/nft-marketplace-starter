import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@mui/material";

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
                    <Skeleton
                      animation="wave"
                      width="100%"
                      height={700}
                    ></Skeleton>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={400}
                        height={65}
                      ></Skeleton>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <Skeleton
                            animation="wave"
                            variant="rectangular"
                            width={60}
                            height={45}
                          ></Skeleton>
                        </div>
                        <div className="item_info_like">
                          <Skeleton
                            animation="wave"
                            variant="rectangular"
                            width={60}
                            height={45}
                          ></Skeleton>
                        </div>
                      </div>
                      <div>
                        <Skeleton
                          animation="wave"
                          variant="text"
                          width={500}
                          height={220}
                        ></Skeleton>
                      </div>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                width={50}
                                height={50}
                              ></Skeleton>
                            </div>
                            <div className="author_list_info">
                              <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width={150}
                                height={45}
                              ></Skeleton>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                width={50}
                                height={50}
                              ></Skeleton>
                            </div>
                            <div className="author_list_info">
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width={150}
                                height={45}
                              ></Skeleton>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={80}
                            height={40}
                          ></Skeleton>
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
