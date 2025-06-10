import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemData, setItemData] = useState([]);
  const loading = itemData.length === 0;

  async function fetchItemDetails() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      setItemData(data);
      console.log(itemData);
    } catch (error) {
      console.error("Error fetching api:", error);
      setItemData([]);
    }
  }

  useEffect(() => {
    fetchItemDetails();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading && (
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton height={"100%"} />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      <Skeleton />
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
                      <Skeleton count={4} />
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton circle={true} height={50} />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <Skeleton height={18} width={150} />
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
                            <Skeleton circle={true} height={50} />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <Skeleton height={18} width={150} />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <Skeleton width={"15%"}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!loading && (
              <div className="row" id={itemData.id}>
                <div className="col-md-6 text-center">
                  <img
                    src={itemData.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {itemData.title} #{itemData.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {itemData.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {itemData.likes}
                      </div>
                    </div>
                    <p>{itemData.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemData.ownerId}`}>
                              <img
                                className="lazy"
                                src={itemData.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemData.ownerId}`}>
                              {itemData.ownerName}
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
                            <Link to={`/author/${itemData.creatorId}`}>
                              <img
                                className="lazy"
                                src={itemData.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemData.creatorId}`}>
                              {itemData.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{itemData.price}</span>
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
