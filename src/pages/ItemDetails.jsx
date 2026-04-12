import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();                // Extract nftId from the URL
  const [nft, setNft] = useState(null);         // Stores the NFT data from the API
  const [loading, setLoading] = useState(true); // Controls skeleton visibility

  useEffect(() => {
    window.scrollTo(0, 0);                      // Scroll to top on page load

    const fetchItem = async () => {
      try {
        const { data } = await axios.get(       // Fetch NFT data from API
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        setNft(data);                           // Store response in state
      } catch (error) {
        console.error("Failed to fetch item details:", error); // Log any errors
      } finally {
        setLoading(false);                      // Hide skeleton regardless of success or failure
      }
    };

    fetchItem();                                // Invoke the async function
  }, [nftId]);                                  // Re-runs if user navigates to a different NFT

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (                                           // Show skeleton while loading
                  <div className="skeleton-box item-details-skeleton-image" />
                ) : (
                  <img
                    src={nft?.nftImage}                               // NFT image from API
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (                                         // Show skeletons while loading
                    <>
                      <div className="skeleton-box item-details-skeleton-title" />
                      <div className="skeleton-box item-details-skeleton-counts" />
                      <div className="skeleton-box item-details-skeleton-description" />
                      <div className="skeleton-box item-details-skeleton-owner" />
                      <div className="skeleton-box item-details-skeleton-creator" />
                      <div className="skeleton-box item-details-skeleton-price" />
                    </>
                  ) : (
                    <>
                      <h2>{nft?.title} #{nft?.tag}</h2>               {/* NFT title and tag */}
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nft?.views}                                 {/* View count */}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nft?.likes}                                 {/* Like count */}
                        </div>
                      </div>
                      <p>{nft?.description}</p>                        {/* NFT description */}
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nft?.ownerId}`}>   {/* Link to owner's page */}
                                <img className="lazy" src={nft?.ownerImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nft?.ownerId}`}>{nft?.ownerName}</Link>
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
                              <Link to={`/author/${nft?.creatorId}`}> {/* Link to creator's page */}
                                <img className="lazy" src={nft?.creatorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nft?.creatorId}`}>{nft?.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{nft?.price}</span>                   {/* NFT price in ETH */}
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