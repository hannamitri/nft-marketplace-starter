import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import EthImage from "../images/ethereum.svg";
import "../components/home/HotCollections.css";

const HOT_COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const NFTDetailsSkeleton = () => {
  return (
    <div
      className="row hot-details__loading"
      role="status"
      aria-label="Loading NFT details"
    >
      <div className="col-md-6 text-center">
        <div className="hot-details__skeleton-image">
          <Skeleton width="100%" height="100%" borderRadius="8px" />
        </div>
      </div>

      <div className="col-md-6">
        <div className="hot-details__skeleton-content">
          <Skeleton width="70%" height="35px" borderRadius="5px" />

          <div className="hot-details__skeleton-counts">
            <Skeleton width="65px" height="25px" borderRadius="4px" />
            <Skeleton width="65px" height="25px" borderRadius="4px" />
          </div>

          <div className="hot-details__skeleton-description">
            <Skeleton width="100%" height="14px" borderRadius="4px" />
            <Skeleton width="95%" height="14px" borderRadius="4px" />
            <Skeleton width="85%" height="14px" borderRadius="4px" />
          </div>

          <Skeleton width="70px" height="16px" borderRadius="4px" />

          <div className="hot-details__skeleton-author">
            <Skeleton width="45px" height="45px" borderRadius="50%" />
            <Skeleton width="120px" height="16px" borderRadius="4px" />
          </div>

          <Skeleton width="70px" height="16px" borderRadius="4px" />

          <div className="hot-details__skeleton-author">
            <Skeleton width="45px" height="45px" borderRadius="50%" />
            <Skeleton width="120px" height="16px" borderRadius="4px" />
          </div>

          <Skeleton width="60px" height="16px" borderRadius="4px" />

          <Skeleton width="110px" height="28px" borderRadius="4px" />
        </div>
      </div>
    </div>
  );
};

const HotCollectionDetails = () => {
  const { nftId } = useParams();

  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    window.scrollTo(0, 0);

    async function getCollection() {
      setLoading(true);
      setError("");
      setCollection(null);

      try {
        const { data } = await axios.get(HOT_COLLECTIONS_URL);

        if (!Array.isArray(data)) {
          throw new Error("Unexpected API response");
        }

        const selectedCollection = data.find(
          (item) => String(item.nftId) === nftId,
        );

        if (active) {
          setCollection(selectedCollection || null);
        }
      } catch (err) {
        console.error("Error fetching NFT details:", err);

        if (active) {
          setError("Unable to load NFT details.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    getCollection();

    return () => {
      active = false;
    };
  }, [nftId]);

  const nftNumber = collection?.tokenId ?? collection?.nftNumber;

  const nftTitle = collection
    ? nftNumber != null
      ? `${collection.title} #${nftNumber}`
      : collection.title
    : "";

  const ownerName = collection?.ownerName || "Owner information unavailable";

  const creatorName =
    collection?.creatorName ||
    collection?.authorName ||
    (collection?.authorId != null
      ? `Creator ID: ${collection.authorId}`
      : "Creator information unavailable");

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="NFT details" className="mt90 sm-mt-0">
          <div className="container">
            {loading ? (
              <NFTDetailsSkeleton />
            ) : error ? (
              <p role="alert">{error}</p>
            ) : !collection ? (
              <p>NFT not found.</p>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={collection.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={nftTitle}
                  />
                </div>

                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{nftTitle}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {collection.views ?? "—"}
                      </div>

                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {collection.likes ?? "—"}
                      </div>
                    </div>

                    <p>
                      {collection.description || "Description unavailable."}
                    </p>

                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>

                        <div className="item_author">
                          {collection.ownerImage && (
                            <div className="author_list_pp">
                              <img
                                className="lazy"
                                src={collection.ownerImage}
                                alt={ownerName}
                              />
                            </div>
                          )}

                          <div className="author_list_info">
                            <strong>{ownerName}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>

                        <div className="item_author">
                          {collection.authorImage && (
                            <div className="author_list_pp">
                              <img
                                className="lazy"
                                src={collection.authorImage}
                                alt={creatorName}
                              />
                            </div>
                          )}

                          <div className="author_list_info">
                            <strong>{creatorName}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="spacer-40"></div>

                      <h6>Price</h6>

                      <div className="nft-item-price">
                        {collection.priceEth != null ? (
                          <>
                            <img src={EthImage} alt="Ethereum" />
                            <span>{collection.priceEth}</span>
                          </>
                        ) : (
                          <span>Price unavailable</span>
                        )}
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

export default HotCollectionDetails;
