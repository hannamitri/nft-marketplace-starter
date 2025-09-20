import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const ItemDetails = () => {
  const [data, setData] = React.useState({});
  const { itemId } = useParams();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
      );
      setData(data);
      setLoading(false);
    }
    getData();
    console.log(data);
  }, []);

  return (
    <>
      {loading && (
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <Skeleton width={500} height={500} borderRadius={10} />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        <Skeleton width={300} height={30} borderRadius={5} />
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          <Skeleton width={100} height={20} borderRadius={5} />
                        </div>
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        <Skeleton width={100} height={20} borderRadius={5} />
                      </div>
                    </div>
                    <Skeleton width={400} height={100} borderRadius={5} />
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>
                          <Skeleton width={100} height={20} borderRadius={5} />
                        </h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton
                              width={50}
                              height={50}
                              borderRadius={100}
                            />
                          </div>
                          <div className="author_list_info">
                            <Skeleton
                              width={100}
                              height={20}
                              borderRadius={5}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>
                          <Skeleton width={100} height={20} borderRadius={5} />
                        </h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton
                              width={50}
                              height={50}
                              borderRadius={100}
                            />
                          </div>
                          <div className="author_list_info">
                            <Skeleton
                              width={100}
                              height={20}
                              borderRadius={5}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>
                        <Skeleton width={100} height={20} borderRadius={5} />
                      </h6>
                      <div className="nft-item-price">
                        <Skeleton width={100} height={20} borderRadius={5} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
      {!loading && (
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <img
                      src={data.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{data.title}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {data.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {data.likes}
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
                              <Link to={`/author/${data.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={data.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${data.ownerId}`}>
                                {data.ownerName}
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
                              <Link to={`/author/${data.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={data.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${data.creatorId}`}>
                                {data.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>1.85</span>
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
    </>
  );
};

export default ItemDetails;
