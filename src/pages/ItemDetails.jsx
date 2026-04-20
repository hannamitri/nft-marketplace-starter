import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import Skeleton from "../components/UI/Skeleton";
import { fetchItemDetails } from "../api/nftApi";

const MIN_SKELETON_MS = 1000;

const ItemDetailsSkeleton = () => (
  <section aria-label="section" className="mt90 sm-mt-0">
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-center">
          <Skeleton width="100%" height="400px" borderRadius="8px" />
        </div>
        <div className="col-md-6">
          <div className="item_info">
            <Skeleton width="75%" height="36px" borderRadius="6px" />
            <div className="item_info_counts mt-3">
              <Skeleton width="120px" height="24px" borderRadius="6px" />
            </div>
            <div className="mt-4">
              <Skeleton width="100%" height="14px" borderRadius="4px" />
              <Skeleton width="100%" height="14px" borderRadius="4px" />
              <Skeleton width="90%" height="14px" borderRadius="4px" />
            </div>
            <div className="d-flex flex-row mt-4">
              <Skeleton width="200px" height="80px" borderRadius="8px" />
            </div>
            <div className="spacer-40"></div>
            <Skeleton width="80px" height="20px" borderRadius="4px" />
            <div className="mt-2">
              <Skeleton width="160px" height="32px" borderRadius="6px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!nftId) {
      setError("Missing item id.");
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError("");
      setItem(null);
      const started = Date.now();

      try {
        const data = await fetchItemDetails(nftId, controller.signal);
        if (!cancelled) {
          setItem(data);
        }
      } catch (fetchError) {
        if (fetchError.name !== "AbortError" && !cancelled) {
          setError("Unable to load this item right now.");
        }
      } finally {
        const elapsed = Date.now() - started;
        const remaining = MIN_SKELETON_MS - elapsed;
        if (remaining > 0) {
          await new Promise((resolve) => setTimeout(resolve, remaining));
        }
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {isLoading && <ItemDetailsSkeleton />}

        {!isLoading && error && (
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <p>{error}</p>
              <Link to="/">Back to home</Link>
            </div>
          </section>
        )}

        {!isLoading && !error && item && (
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{item.title}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {item.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {item.likes}
                      </div>
                    </div>
                    <p>{item.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to="/author">
                              <img
                                className="lazy"
                                src={item.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to="/author">{item.ownerName}</Link>
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
                              <img
                                className="lazy"
                                src={item.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to="/author">{item.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{item.price}</span>
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
