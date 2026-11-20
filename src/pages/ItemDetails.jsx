import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );
        setItem(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width="100%" height="420px" borderRadius="12px" />
                ) : (
                  <img
                    src={item?.nftImage || nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item?.title || "NFT"}
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {loading ? (
                      <Skeleton width="240px" height="32px" borderRadius="6px" />
                    ) : (
                      item?.title
                    )}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? "..." : item?.views ?? 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart text-danger"></i>
                      {loading ? "..." : item?.likes ?? 0}
                    </div>
                  </div>
                  <p>
                    {loading ? (
                      <Skeleton width="100%" height="90px" borderRadius="6px" />
                    ) : (
                      item?.description
                    )}
                  </p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          ) : (
                            <Link to={`/author/${item?.ownerId}`}>
                              <img
                                className="lazy"
                                src={
                                  item?.ownerImage ||
                                  item?.authorImage ||
                                  AuthorImage
                                }
                                alt={item?.ownerName || "Owner"}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton
                              width="120px"
                              height="20px"
                              borderRadius="4px"
                            />
                          ) : (
                            <Link to={`/author/${item?.ownerId}`}>
                              {item?.ownerName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          ) : (
                            <Link
                              to={`/author/${item?.creatorId || item?.ownerId}`}
                            >
                              <img
                                className="lazy"
                                src={
                                  item?.creatorImage ||
                                  item?.ownerImage ||
                                  AuthorImage
                                }
                                alt={
                                  item?.creatorName ||
                                  item?.ownerName ||
                                  "Creator"
                                }
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton
                              width="120px"
                              height="20px"
                              borderRadius="4px"
                            />
                          ) : (
                            <Link
                              to={`/author/${item?.creatorId || item?.ownerId}`}
                            >
                              {item?.creatorName || item?.ownerName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="ETH" />
                      <span>{loading ? "..." : item?.price ?? "-"}</span>
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