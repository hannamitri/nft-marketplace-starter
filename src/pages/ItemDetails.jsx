import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useSearchParams } from "react-router-dom";
import ItemDetailsSkeleton from "../components/item/ItemDetailsSkeleton";
import { SKELETON_MIN_MS } from "../constants/exploreApi";
import {
  buildAuthorDisplay,
  loadItemDetailsData,
} from "../utils/loadItemDetailsData";
import { withMinDelay } from "../utils/withMinDelay";

function formatEth(price) {
  const n = Number(price);
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(2);
}

const ItemDetails = () => {
  const [searchParams] = useSearchParams();
  const nftIdParam = searchParams.get("nftId");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nft, setNft] = useState(null);
  const [authorDisplay, setAuthorDisplay] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [nftIdParam]);

  useEffect(() => {
    if (!nftIdParam) {
      setLoading(false);
      setError("missing_nft");
      setNft(null);
      setAuthorDisplay(null);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await withMinDelay(
          SKELETON_MIN_MS,
          loadItemDetailsData(nftIdParam)
        );
        if (cancelled) return;
        setNft(result.nft);
        setAuthorDisplay(buildAuthorDisplay(result.nft, result.author));
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Failed to load item");
          setNft(null);
          setAuthorDisplay(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [nftIdParam]);

  const authorPath =
    authorDisplay != null
      ? `/author?authorId=${encodeURIComponent(authorDisplay.id)}`
      : "/author";

  const descriptionText =
    authorDisplay?.bio && authorDisplay.bio.trim().length > 0
      ? authorDisplay.bio
      : "No description is available for this item yet.";

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {loading && <ItemDetailsSkeleton />}
        {!loading && error === "missing_nft" && (
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center py-5">
                  <p>This page needs an NFT id in the URL.</p>
                  <Link to="/explore" className="btn-main">
                    Back to Explore
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
        {!loading && error && error !== "missing_nft" && (
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center py-5 text-danger">
                  <p>{error}</p>
                  <Link to="/explore" className="btn-main">
                    Back to Explore
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
        {!loading && !error && nft && authorDisplay && (
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={nft.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={nft.title || "NFT"}
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {nft.title}{" "}
                      <span className="text-muted">#{nft.nftId}</span>
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {nft.views != null ? nft.views : "—"}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {nft.likes}
                      </div>
                    </div>
                    <p>{descriptionText}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={authorPath}>
                              <img
                                className="lazy"
                                src={authorDisplay.image}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={authorPath}>{authorDisplay.name}</Link>
                            {authorDisplay.username ? (
                              <div className="text-muted small">
                                @{authorDisplay.username}
                              </div>
                            ) : null}
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
                            <Link to={authorPath}>
                              <img
                                className="lazy"
                                src={authorDisplay.image}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={authorPath}>{authorDisplay.name}</Link>
                            {authorDisplay.username ? (
                              <div className="text-muted small">
                                @{authorDisplay.username}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      {authorDisplay.followersLabel ? (
                        <>
                          <div className="spacer-20"></div>
                          <p className="mb-0">{authorDisplay.followersLabel}</p>
                        </>
                      ) : null}
                      {authorDisplay.wallet ? (
                        <>
                          <div className="spacer-20"></div>
                          <h6>Wallet</h6>
                          <p className="profile_wallet small text-break">
                            {authorDisplay.wallet}
                          </p>
                        </>
                      ) : null}
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{formatEth(nft.price)}</span>
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
