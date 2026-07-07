import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import ItemDetailsSkeleton from "../components/common/ItemDetailsSkeleton";
import useExploreNfts from "../hooks/useExploreNfts";
import { buildItemDetailsUrl, MIN_SKELETON_MS } from "../constants/api";

const ItemDetails = () => {
  const { nftId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { uniqueItems } = useExploreNfts();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      AOS.refreshHard();
    });
    return () => window.cancelAnimationFrame(id);
  }, [loading, itemDetails, error]);

  const selectedItem = useMemo(() => {
    if (location.state?.selectedItem) {
      return location.state.selectedItem;
    }

    if (nftId) {
      return (
        uniqueItems.find((item) => String(item.nftId) === String(nftId)) || null
      );
    }

    return uniqueItems[0] || null;
  }, [location.state, nftId, uniqueItems]);

  const selectedNftId = useMemo(() => {
    if (selectedItem?.nftId !== undefined && selectedItem?.nftId !== null) {
      return String(selectedItem.nftId);
    }
    if (nftId) {
      return String(nftId);
    }
    const queryNftId = new URLSearchParams(location.search).get("nftId");
    if (queryNftId) {
      return queryNftId;
    }
    return "17914494";
  }, [selectedItem, nftId, location.search]);

  useEffect(() => {
    if (nftId && !selectedItem && uniqueItems.length > 0) {
      navigate("/explore", {
        replace: true,
        state: { notice: "Item not found." },
      });
    }
  }, [nftId, selectedItem, uniqueItems, navigate]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const loadDetails = async () => {
      const minimumDelay = new Promise((resolve) =>
        setTimeout(resolve, MIN_SKELETON_MS)
      );

      try {
        setLoading(true);
        setError("");
        setItemDetails(null);

        const response = await fetch(buildItemDetailsUrl(selectedNftId), {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Item details request failed: ${response.status}`);
        }

        const payload = await response.json();
        await minimumDelay;
        if (mounted) {
          setItemDetails(payload || null);
          setLoading(false);
        }
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }
        await minimumDelay;
        if (mounted) {
          setError("Unable to load item details right now.");
          setLoading(false);
        }
      }
    };

    loadDetails();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [selectedNftId]);

  const ownerName = itemDetails?.ownerName?.trim() || "Owner unavailable";
  const creatorName =
    itemDetails?.creatorName?.trim() ||
    itemDetails?.ownerName?.trim() ||
    "Creator unavailable";
  const ownerId = itemDetails?.ownerId;
  const creatorId = itemDetails?.creatorId;
  const imageUrl = itemDetails?.imageUrl || selectedItem?.nftImage || nftImage;
  const title = itemDetails?.title || selectedItem?.title || "Untitled NFT";
  const description =
    itemDetails?.description ||
    "No description is available for this NFT yet.";
  const views = Number.isFinite(Number(itemDetails?.views)) ? itemDetails.views : 0;
  const likes = Number.isFinite(Number(itemDetails?.likes)) ? itemDetails.likes : 0;
  const numericPrice = Number(itemDetails?.price);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {loading && <ItemDetailsSkeleton />}
        {!loading && error && (
          <section
            aria-label="section"
            className="mt90 sm-mt-0"
            data-aos="fade-up"
            data-aos-duration="1100"
            data-aos-easing="ease-out"
          >
            <div className="container">
              <p>{error}</p>
            </div>
          </section>
        )}
        {!loading && !error && !itemDetails && (
          <section
            aria-label="section"
            className="mt90 sm-mt-0"
            data-aos="fade-up"
            data-aos-duration="1100"
            data-aos-easing="ease-out"
          >
            <div className="container">
              <p>No item details available.</p>
            </div>
          </section>
        )}
        {!loading && !error && itemDetails && (
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div
                  className="col-md-6 text-center"
                  data-aos="fade-up"
                  data-aos-duration="1100"
                  data-aos-easing="ease-out"
                >
                  <img
                    src={imageUrl}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={title}
                    onError={(event) => {
                      event.currentTarget.src = nftImage;
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-easing="ease-out"
                      data-aos-delay="120"
                    >
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
                    </div>
                    <div
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-easing="ease-out"
                      data-aos-delay="220"
                    >
                      <p>{description}</p>
                    </div>
                    <div
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-easing="ease-out"
                      data-aos-delay="300"
                    >
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={ownerId ? `/author/${ownerId}` : "/author"}>
                                <img
                                  className="lazy"
                                  src={itemDetails?.ownerImage || AuthorImage}
                                  alt={ownerName}
                                  onError={(event) => {
                                    event.currentTarget.src = AuthorImage;
                                  }}
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={ownerId ? `/author/${ownerId}` : "/author"}>
                                {ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </div>
                    <div
                      className="de_tab tab_simple"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-easing="ease-out"
                      data-aos-delay="400"
                    >
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={creatorId ? `/author/${creatorId}` : "/author"}>
                              <img
                                className="lazy"
                                src={itemDetails?.creatorImage || AuthorImage}
                                alt={creatorName}
                                onError={(event) => {
                                  event.currentTarget.src = AuthorImage;
                                }}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={creatorId ? `/author/${creatorId}` : "/author"}>
                              {creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>
                          {Number.isNaN(numericPrice) ? "0.00" : numericPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
