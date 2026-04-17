import React, { useEffect, useMemo, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import Skeleton from "../components/UI/Skeleton";
import useScrollToTopOnNavigate from "../hooks/useScrollToTopOnNavigate";

const HOT_COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";
const ITEM_DETAILS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";
const EXTRA_LOADING_DELAY_MS = 1000;

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useScrollToTopOnNavigate();

  useEffect(() => {
    let cancelled = false;

    const loadItem = async () => {
      setLoading(true);
      setError(null);
      setItem(null);

      try {
        const res = await fetch(HOT_COLLECTIONS_URL);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error("Unexpected API response");
        }

        const matchedItem = data.find(
          (entry) => String(entry?.id) === String(id)
        );

        if (!matchedItem) {
          if (!cancelled) {
            setItem(null);
          }
          return;
        }

        const detailsRes = await fetch(
          `${ITEM_DETAILS_URL}?nftId=${matchedItem.nftId}`
        );
        if (!detailsRes.ok) {
          throw new Error(`HTTP ${detailsRes.status}`);
        }

        const details = await detailsRes.json();
        if (!details || typeof details !== "object") {
          throw new Error("Unexpected details API response");
        }

        if (!cancelled) {
          setItem({ ...matchedItem, ...details });
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Failed to load item details");
        }
      } finally {
        await new Promise((resolve) =>
          setTimeout(resolve, EXTRA_LOADING_DELAY_MS)
        );
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadItem();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const display = useMemo(() => {
    if (!item) {
      return {
        title: `NFT #${id}`,
        image: nftImage,
        ownerImage: AuthorImage,
        ownerName: "Unknown owner",
        creatorImage: AuthorImage,
        creatorName: "Unknown creator",
        views: 0,
        likes: 0,
        description: "No description is available for this NFT yet.",
        price: null,
        tokenCode: "",
      };
    }

    return {
      title: item.title || `NFT #${id}`,
      image: item.nftImage || nftImage,
      ownerImage: item.ownerImage || item.authorImage || AuthorImage,
      ownerName: item.ownerName || "Unknown owner",
      creatorImage:
        item.creatorImage || item.ownerImage || item.authorImage || AuthorImage,
      creatorName: item.creatorName || item.ownerName || "Unknown creator",
      views: item.views ?? item.viewCount ?? 0,
      likes: item.likes ?? item.likeCount ?? 0,
      description:
        item.description || "No description is available for this NFT yet.",
      price: item.price ?? item.nftPrice ?? item.floorPrice ?? null,
      tokenCode: item.code ? `ERC-${item.code}` : "",
    };
  }, [id, item]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width="100%" height="520px" borderRadius="12px" />
                ) : (
                  <img
                    src={display.image}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={display.title}
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading && <h2>Loading NFT...</h2>}
                  {!loading && !error && <h2>{display.title}</h2>}
                  {!loading && error && <h2>Unable to load NFT</h2>}
                  {!loading && !error && display.tokenCode && (
                    <p className="mb-2">{display.tokenCode}</p>
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {display.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {display.likes}
                    </div>
                  </div>
                  {loading && <p>Loading item details...</p>}
                  {!loading && error && (
                    <p className="text-danger" role="alert">
                      {error}
                    </p>
                  )}
                  {!loading && !error && !item && (
                    <p role="status">
                      This item could not be found. Please return to Hot
                      Collections and try another NFT.
                    </p>
                  )}
                  {!loading && !error && item && <p>{display.description}</p>}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            {loading ? (
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                            ) : (
                              <img
                                className="lazy"
                                src={display.ownerImage}
                                alt={display.ownerName}
                              />
                            )}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{display.ownerName}</Link>
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
                          <Link to="/author">
                            {loading ? (
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                            ) : (
                              <img
                                className="lazy"
                                src={display.creatorImage}
                                alt={display.creatorName}
                              />
                            )}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{display.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>
                        {display.price !== null && display.price !== undefined
                          ? display.price
                          : "N/A"}
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
