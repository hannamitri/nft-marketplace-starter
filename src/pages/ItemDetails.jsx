import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId = "17914494" } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [nftId]);

  useEffect(() => {
    async function getItemDetails() {
      try {
        setHasError(false);
        setIsLoading(true);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
        );
        setItemDetails(response.data);
      } catch (error) {
        console.error("Failed to load item details:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getItemDetails();
  }, [nftId]);

  const displayTitle = itemDetails?.title || "NFT Item";
  const displayTag = itemDetails?.tag ? ` #${itemDetails.tag}` : "";
  const displayDescription =
    itemDetails?.description || "Item details are unavailable right now.";
  const displayImage = itemDetails?.nftImage || nftImage;
  const displayViews = itemDetails?.views ?? 0;
  const displayLikes = itemDetails?.likes ?? 0;
  const displayPrice = itemDetails?.price ?? 0;
  const ownerName = itemDetails?.ownerName || "Owner unavailable";
  const ownerId = itemDetails?.ownerId;
  const ownerImage = itemDetails?.ownerImage || AuthorImage;
  const creatorName = itemDetails?.creatorName || "Creator unavailable";
  const creatorId = itemDetails?.creatorId;
  const creatorImage = itemDetails?.creatorImage || AuthorImage;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center" data-aos="fade-up">
                {isLoading ? (
                  <Skeleton width="100%" height="620px" borderRadius="8px" />
                ) : (
                  <img
                    src={displayImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={displayTitle}
                  />
                )}
              </div>
              <div className="col-md-6" data-aos="fade-up">
                <div className="item_info" data-aos="fade-up">
                  {hasError && (
                    <p>We couldn&apos;t load this item right now.</p>
                  )}

                  {isLoading ? (
                    <>
                      <Skeleton width="320px" height="42px" borderRadius="4px" />
                      <div style={{ marginTop: "12px" }}>
                        <Skeleton width="140px" height="24px" borderRadius="4px" />
                      </div>
                    </>
                  ) : (
                    <h2>
                      {displayTitle}
                      {displayTag}
                    </h2>
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {isLoading ? "..." : displayViews}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {isLoading ? "..." : displayLikes}
                    </div>
                  </div>
                  {isLoading ? (
                    <>
                      <Skeleton width="100%" height="16px" borderRadius="4px" />
                      <div style={{ marginTop: "8px" }}>
                        <Skeleton width="92%" height="16px" borderRadius="4px" />
                      </div>
                      <div style={{ marginTop: "8px" }}>
                        <Skeleton width="84%" height="16px" borderRadius="4px" />
                      </div>
                    </>
                  ) : (
                    <p>{displayDescription}</p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {isLoading ? (
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="25px"
                            />
                          ) : (
                            <Link to={ownerId ? `/author/${ownerId}` : "/author"}>
                              <img className="lazy" src={ownerImage} alt={ownerName} />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {isLoading ? (
                            <Skeleton
                              width="140px"
                              height="18px"
                              borderRadius="4px"
                            />
                          ) : (
                            <Link to={ownerId ? `/author/${ownerId}` : "/author"}>
                              {ownerName}
                            </Link>
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
                          {isLoading ? (
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="25px"
                            />
                          ) : (
                            <Link
                              to={creatorId ? `/author/${creatorId}` : "/author"}
                            >
                              <img
                                className="lazy"
                                src={creatorImage}
                                alt={creatorName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {isLoading ? (
                            <Skeleton
                              width="140px"
                              height="18px"
                              borderRadius="4px"
                            />
                          ) : (
                            <Link
                              to={creatorId ? `/author/${creatorId}` : "/author"}
                            >
                              {creatorName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{isLoading ? "..." : displayPrice}</span>
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
