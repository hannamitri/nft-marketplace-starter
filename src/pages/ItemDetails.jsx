import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );
        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error("Failed to load item details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {/* NFT Image */}
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton height={400} width={400} />
                ) : (
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item.title}
                  />
                )}
              </div>

              {/* NFT Details */}
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{loading ? <Skeleton width={200} /> : item.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>{" "}
                      {loading ? <Skeleton width={20} /> : item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>{" "}
                      {loading ? <Skeleton width={20} /> : item.likes}
                    </div>
                  </div>

                  <p>{loading ? <Skeleton count={3} /> : item.description}</p>

                  {/* Owner */}
                  <div className="d-flex flex-row mb-3">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton circle height={50} width={50} />
                          ) : (
                            <Link to="/author">
                              <img
                                className="lazy"
                                src={item.ownerImage}
                                alt={item.ownerName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width={100} />
                          ) : (
                            <Link to="/author">{item.ownerName}</Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Creator */}
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content mb-3">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton circle height={50} width={50} />
                          ) : (
                            <Link to="/author">
                              <img
                                className="lazy"
                                src={item.creatorImage}
                                alt={item.creatorName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width={100} />
                          ) : (
                            <Link to="/author">{item.creatorName}</Link>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {loading ? (
                        <Skeleton width={50} />
                      ) : (
                        <>
                          <img src={EthImage} alt="ETH" />
                          <span>{item.price}</span>
                        </>
                      )}
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
