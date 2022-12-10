import React, { useState, useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  async function getItemDetails() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setItemDetails(data);
    setLoading(false);
  }

  useEffect(() => {
    getItemDetails();
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
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton width={635} height={635} borderRadius={1} />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        <Skeleton width={300} height={40} borderRadius={1} />
                      </h2>
                      <div className="item_info_counts">
                        <Skeleton width={80} height={30} borderRadius={1} />
                        <Skeleton width={80} height={30} borderRadius={1} />
                      </div>
                      <p>
                        <Skeleton width={600} height={18} borderRadius={1} />
                        <Skeleton width={500} height={18} borderRadius={1} />
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>
                            <Skeleton
                              width={100}
                              height={20}
                              borderRadius={1}
                            />
                          </h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width={48}
                                height={48}
                                borderRadius={50}
                              />
                            </div>
                            <div className="author_list_info">
                              <Skeleton
                                width={100}
                                height={20}
                                borderRadius={1}
                              />
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>
                            <Skeleton width={60} height={20} borderRadius={1} />
                          </h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width={48}
                                height={48}
                                borderRadius={50}
                              />
                            </div>
                            <div className="author_list_info">
                              <Skeleton
                                width={100}
                                height={20}
                                borderRadius={1}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>
                          <Skeleton width={60} height={20} borderRadius={1} />
                        </h6>
                        <div className="nft-item-price">
                          <Skeleton width={80} height={40} borderRadius={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={itemDetails.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {itemDetails.title} #{itemDetails.tag}
                      </h2>
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
                              <Link to={`/author/${itemDetails.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetails.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails.ownerId}`}>
                                {itemDetails.ownerName}
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
                              <Link to={`/author/${itemDetails.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetails.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails.creatorId}`}>
                                {itemDetails.creatorName}
                              </Link>
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
