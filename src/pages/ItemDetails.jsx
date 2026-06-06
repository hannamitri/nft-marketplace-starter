import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  // 1. Grab the dynamic nftId parameter right out of the browser address bar route
  const { nftId } = useParams();
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        // 2. Append the dynamic ID variable straight to the network endpoint search query
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        if (!response.ok) throw new Error("Failed to pull item analytics package");
        const data = await response.json();
        setNftData(data);
      } catch (error) {
        console.error("Error pulling item details configuration payload:", error);
      } finally {
        setLoading(false);
      }
    };

    if (nftId) {
      fetchItemDetails();
    }
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              
              {/* IMAGE COLUMN VIEW */}
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width="100%" height="400px" borderRadius="12px" />
                ) : (
                  <img
                    src={nftData?.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={nftData?.title}
                  />
                )}
              </div>

              {/* DATA DETAILS COLUMN VIEW */}
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {loading ? <Skeleton width="80%" height="36px" borderRadius="4px" /> : nftData?.title}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? "..." : nftData?.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? "..." : nftData?.likes}
                    </div>
                  </div>
                  
                  <p>
                    {loading ? (
                      <>
                        <Skeleton width="100%" height="16px" borderRadius="4px" style={{ marginBottom: "6px" }} />
                        <Skeleton width="95%" height="16px" borderRadius="4px" style={{ marginBottom: "6px" }} />
                        <Skeleton width="40%" height="16px" borderRadius="4px" />
                      </>
                    ) : (
                      nftData?.description
                    )}
                  </p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${nftData?.ownerId}`}>
                              <img className="lazy" src={nftData?.ownerImage} alt="Owner Avatar" />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="100px" height="18px" borderRadius="4px" />
                          ) : (
                            <Link to={`/author/${nftData?.ownerId}`}>{nftData?.ownerName}</Link>
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
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${nftData?.creatorId}`}>
                              <img className="lazy" src={nftData?.creatorImage} alt="Creator Avatar" />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="100px" height="18px" borderRadius="4px" />
                          ) : (
                            <Link to={`/author/${nftData?.creatorId}`}>{nftData?.creatorName}</Link>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="spacer-40"></div>
                    
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum Protocol logo" />
                      <span>
                        {loading ? "..." : nftData?.price}
                      </span>
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
