import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import ItemDetailsSkeleton from "../components/item/ItemDetailsSkeleton";
import useExploreNfts from "../hooks/useExploreNfts";
import { buildAuthorsUrl } from "../constants/api";

const formatEthAmount = (price) => {
  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice)) {
    return "0.00";
  }
  return numericPrice.toFixed(2);
};

const normalizeId = (value) =>
  value !== undefined && value !== null && String(value).trim() !== ""
    ? String(value)
    : "";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { uniqueItems, loading, error } = useExploreNfts();
  const [authorMetaById, setAuthorMetaById] = useState({});
  const [creatorName, setCreatorName] = useState(null);
  const [ownerName, setOwnerName] = useState(null);

  const targetId = useMemo(() => {
    const fromQuery = normalizeId(searchParams.get("nftId"));
    return normalizeId(nftId) || fromQuery;
  }, [nftId, searchParams]);

  const item = useMemo(() => {
    const routeStateItem = location.state?.selectedItem;
    if (routeStateItem && typeof routeStateItem === "object") {
      const stateId = normalizeId(routeStateItem.nftId ?? routeStateItem.id);
      if (!targetId || stateId === targetId) {
        return routeStateItem;
      }
    }

    if (!targetId) {
      return uniqueItems[0];
    }

    return uniqueItems.find((row) => {
      const rowNftId = normalizeId(row.nftId);
      const rowId = normalizeId(row.id);
      return rowNftId === targetId || rowId === targetId;
    });
  }, [location.state, targetId, uniqueItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [targetId]);

  useEffect(() => {
    if (!loading && !error && targetId && !item) {
      navigate("/explore", {
        replace: true,
        state: { notice: "Item not found." },
      });
    }
  }, [loading, error, targetId, item, navigate]);

  const sortedAuthorIds = useMemo(() => {
    const ids = Array.from(
      new Set(
        uniqueItems
          .map((row) => row.authorId)
          .map(normalizeId)
          .filter(Boolean)
      )
    );
    return ids.sort((a, b) => Number(a) - Number(b));
  }, [uniqueItems]);

  const creatorAuthorId = item ? normalizeId(item.authorId) : "";

  const ownerAuthorId = useMemo(() => {
    if (!item) {
      return "";
    }
    if (sortedAuthorIds.length === 0) {
      return creatorAuthorId;
    }

    const nftNumber = Number(item.nftId ?? item.id);
    const baseIndex = Number.isFinite(nftNumber)
      ? Math.abs(Math.floor(nftNumber)) % sortedAuthorIds.length
      : 0;
    let selectedId = sortedAuthorIds[baseIndex];

    if (
      sortedAuthorIds.length > 1 &&
      creatorAuthorId &&
      selectedId === creatorAuthorId
    ) {
      selectedId = sortedAuthorIds[(baseIndex + 1) % sortedAuthorIds.length];
    }
    return selectedId;
  }, [item, sortedAuthorIds, creatorAuthorId]);

  useEffect(() => {
    if (!item) {
      setCreatorName(null);
      setOwnerName(null);
      return undefined;
    }

    const controller = new AbortController();
    let cancelled = false;

    const requiredAuthorIds = Array.from(
      new Set([...sortedAuthorIds, creatorAuthorId, ownerAuthorId].filter(Boolean))
    );

    const loadAuthorNames = async () => {
      const missingIds = requiredAuthorIds.filter((id) => !authorMetaById[id]);
      const resolvedNow = {};

      if (missingIds.length > 0) {
        const pairs = await Promise.all(
          missingIds.map(async (authorId) => {
            try {
              const response = await fetch(buildAuthorsUrl(authorId), {
                signal: controller.signal,
              });
              if (!response.ok) {
                return [authorId, null];
              }

              const data = await response.json();
              const name =
                typeof data.authorName === "string" && data.authorName.trim()
                  ? data.authorName.trim()
                  : null;
              const image =
                typeof data.authorImage === "string" && data.authorImage.trim()
                  ? data.authorImage.trim()
                  : null;
              return [authorId, { name, image }];
            } catch (fetchError) {
              if (fetchError.name === "AbortError") {
                return [authorId, null];
              }
              return [authorId, null];
            }
          })
        );

        pairs.forEach(([authorId, meta]) => {
          if (meta && (meta.name || meta.image)) {
            resolvedNow[authorId] = meta;
          }
        });
      }

      if (cancelled || controller.signal.aborted) {
        return;
      }

      const mergedMeta =
        Object.keys(resolvedNow).length > 0
          ? { ...authorMetaById, ...resolvedNow }
          : authorMetaById;

      if (Object.keys(resolvedNow).length > 0) {
        setAuthorMetaById((prev) => ({ ...prev, ...resolvedNow }));
      }

      setCreatorName(mergedMeta[creatorAuthorId]?.name || null);
      setOwnerName(mergedMeta[ownerAuthorId]?.name || null);
    };

    loadAuthorNames();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [item, sortedAuthorIds, creatorAuthorId, ownerAuthorId, authorMetaById]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <ItemDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center py-5">
                  <p>{error}</p>
                  <Link to="/explore" className="btn-main">
                    Back to Explore
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  const title = item.title || "Untitled NFT";
  const preview = item.nftImage || nftImage;
  const creatorImage =
    authorMetaById[creatorAuthorId]?.image || item.authorImage || AuthorImage;
  const ownerImage = authorMetaById[ownerAuthorId]?.image || item.ownerImage || AuthorImage;
  const creatorPath = creatorAuthorId ? `/author/${creatorAuthorId}` : "/author";
  const ownerPath = ownerAuthorId ? `/author/${ownerAuthorId}` : creatorPath;
  const fallbackCreatorLabel = `Creator #${
    String(creatorAuthorId).slice(-6) || "—"
  }`;
  const fallbackOwnerLabel = `Owner #${
    String(ownerAuthorId || creatorAuthorId).slice(-6) || "—"
  }`;
  const creatorDisplayName = creatorName?.trim() || item.creatorName || fallbackCreatorLabel;
  const ownerDisplayName = ownerName?.trim() || item.ownerName || fallbackOwnerLabel;
  const priceText = formatEthAmount(item.price ?? item.nftPrice ?? item.floorPrice);
  const likes = Number.isFinite(Number(item.likes)) ? Number(item.likes) : 0;
  const views = Number.isFinite(Number(item.views))
    ? Number(item.views)
    : Number.isFinite(Number(item.viewCount))
      ? Number(item.viewCount)
      : likes;

  const handleAvatarError = (event) => {
    if (event.currentTarget.src !== AuthorImage) {
      event.currentTarget.src = AuthorImage;
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={preview}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {likes}
                    </div>
                  </div>
                  <p>{item.description || `Details for ${title}.`}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={ownerPath}>
                            <img
                              className="lazy"
                              src={ownerImage}
                              alt={ownerDisplayName}
                              onError={handleAvatarError}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={ownerPath}>{ownerDisplayName}</Link>
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
                          <Link to={creatorPath}>
                            <img
                              className="lazy"
                              src={creatorImage}
                              alt={creatorDisplayName}
                              onError={handleAvatarError}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={creatorPath}>{creatorDisplayName}</Link>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{priceText}</span>
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
