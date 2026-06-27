import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import useMinimumLoading from "../components/UI/useMinimumLoading";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const displayLoading = useMinimumLoading(loading, 700);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchItem() {
      const response = await fetch(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      const data = await response.json();
      setItem(data);
      setLoading(false);
    }
    fetchItem();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {displayLoading ? (
                  <Skeleton width="100%" height="400px" borderRadius="8px" />
                ) : (
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {displayLoading ? (
                    <Skeleton width="60%" height="36px" borderRadius="4px" />
                  ) : (
                    <h2>{item.title}</h2>
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {displayLoading ? "..." : item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {displayLoading ? "..." : item.likes}
                    </div>
                  </div>
                  {displayLoading ? (
                    <Skeleton width="100%" height="60px" borderRadius="4px" />
                  ) : (
                    <p>{item.description}</p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {displayLoading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${item.ownerId}`}>
                              <img className="lazy" src={item.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {displayLoading ? (
                            <Skeleton width="80px" height="20px" borderRadius="4px" />
                          ) : (
                            <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
                          )}
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
                          {displayLoading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${item.creatorId}`}>
                              <img className="lazy" src={item.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {displayLoading ? (
                            <Skeleton width="80px" height="20px" borderRadius="4px" />
                          ) : (
                            <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{displayLoading ? "..." : item.price}</span>
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
