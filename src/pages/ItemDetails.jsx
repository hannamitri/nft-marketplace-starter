import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import AuthorBanner from "../images/author_banner.jpg";
import nftImage from "../images/nftImage.jpg";
import { useExploreItem } from "../hooks/useExploreItem";
import { useScrollRestoration } from "../hooks/useScrollRestoration";
import ImageWithFallback from "../components/UI/ImageWithFallback";

const TOP_SELLERS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";
const FALLBACK_AUTHOR_ID = "1";

const ItemDetails = () => {
  useScrollRestoration();
  const { nftId, authorId: routeAuthorId } = useParams();
  const { item, loading, error } = useExploreItem(nftId);
  const [placeholderAuthorId, setPlaceholderAuthorId] = useState(FALLBACK_AUTHOR_ID);

  useEffect(() => {
    let isMounted = true;

    const loadFallbackAuthorId = async () => {
      try {
        const response = await fetch(TOP_SELLERS_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch top sellers: ${response.status}`);
        }

        const data = await response.json();
        const resolvedAuthorId = Array.isArray(data)
          ? data[0]?.authorId ?? data[0]?.id
          : data?.authorId ?? data?.id;

        if (isMounted && resolvedAuthorId != null) {
          setPlaceholderAuthorId(String(resolvedAuthorId));
        }
      } catch (fetchError) {
        // Keep rendering with local fallback id if remote data is unavailable.
        console.error(fetchError);
      }
    };

    loadFallbackAuthorId();

    return () => {
      isMounted = false;
    };
  }, []);

  const authorId = routeAuthorId || placeholderAuthorId;
  const hasDynamicItem = Boolean(nftId && authorId);
  const ownerName =
    item && typeof item.authorName === "string" && item.authorName.trim()
      ? item.authorName.trim()
      : "Creator";
  const ownerAuthorId =
    item?.authorId != null
      ? String(item.authorId)
      : authorId;
  const ownerImage = item?.authorImage || AuthorImage;
  const previewImage = item?.nftImage || nftImage;
  const title = item?.title || "Rainbow Style #194";
  const likes = item != null ? String(item.likes ?? "0") : "74";
  const price = item != null ? String(item.price ?? "") : "1.85";

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {hasDynamicItem && loading && (
              <div className="row">
                <div className="col-12 text-center py-5">
                  <p className="mb-0">Loading item…</p>
                </div>
              </div>
            )}
            {hasDynamicItem && error && !loading && (
              <div className="row">
                <div className="col-12 text-center py-5">
                  <p>{error}</p>
                  <Link to="/explore" className="btn-main">
                    Back to explore
                  </Link>
                </div>
              </div>
            )}
            {hasDynamicItem && !loading && !error && !item && (
              <div className="row">
                <div className="col-12 text-center py-5">
                  <p>Item not found.</p>
                  <Link to="/" className="btn-main">
                    Back to home
                  </Link>
                </div>
              </div>
            )}
            {(!hasDynamicItem || (!loading && !error && item)) && (
              <div className="row">
                <div className="col-md-6 text-center">
                  <ImageWithFallback
                    src={hasDynamicItem && item ? previewImage : nftImage}
                    fallbackSrc={nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={hasDynamicItem && item ? title : ""}
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{hasDynamicItem && item ? title : "Rainbow Style #194"}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        100
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {likes}
                      </div>
                    </div>
                    <p>
                      doloremque laudantium, totam rem aperiam, eaque ipsa quae
                      ab illo inventore veritatis et quasi architecto beatae
                      vitae dicta sunt explicabo.
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${ownerAuthorId}`}>
                              <ImageWithFallback
                                className="lazy"
                                src={ownerImage}
                                fallbackSrc={AuthorImage}
                                alt={ownerName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${ownerAuthorId}`}>
                              {hasDynamicItem && item ? ownerName : "Monica Lucas"}
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
                            <Link to={`/author/${ownerAuthorId}`}>
                              <ImageWithFallback
                                className="lazy"
                                src={ownerImage}
                                fallbackSrc={AuthorImage}
                                alt={ownerName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${ownerAuthorId}`}>
                              {hasDynamicItem && item ? ownerName : "Monica Lucas"}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{hasDynamicItem && item ? price : "1.85"}</span>
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
