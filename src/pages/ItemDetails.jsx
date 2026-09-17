import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import { API_URLS, fetchApiObject } from "../api/nftApi";
import { ItemDetailsSkeleton } from "../components/UI/LoadingSkeletons";

const PersonRow = ({ label, id, image, name }) => (
  <div className="item-person">
    <h6>{label}</h6>
    <Link className="item-person-link" to={`/${id}/author`}>
      <span className="author_list_pp">
        <img className="lazy" src={image} alt={`${label} ${name}`} />
        <i className="fa fa-check" aria-hidden="true"></i>
      </span>
      <strong>{name}</strong>
    </Link>
  </div>
);

const ItemDetails = () => {
  const { id: nftId } = useParams();
  const location = useLocation();
  const isExploreItem = location.pathname.startsWith("/explore/item/");
  const backPath = isExploreItem ? "/explore" : "/";
  const backLabel = isExploreItem ? "Back to Explore" : "Back to marketplace";
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(Boolean(nftId));
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!nftId) return undefined;

    const controller = new AbortController();
    setItem(null);
    setLoading(true);
    setError("");

    async function loadItem() {
      try {
        const data = await fetchApiObject(
          `${API_URLS.itemDetails}?nftId=${encodeURIComponent(nftId)}`,
          controller.signal
        );
        if (!controller.signal.aborted) setItem(data);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError("Unable to load this item. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadItem();
    return () => controller.abort();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="Item details" className="mt90 sm-mt-0">
          <div className="container">
            {!nftId && <p>Select an item to see its details. <Link to="/">View items</Link></p>}
            {nftId && loading && <ItemDetailsSkeleton />}
            {nftId && !loading && error && (
              <p role="alert">{error} <Link to={backPath}>{backLabel}</Link></p>
            )}
            {nftId && !loading && !error && item && (
              <div className="row item-details-layout">
                <div className="col-md-6 text-center item-details-artwork">
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item.title}
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{item.title} #{item.tag}</h2>
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye" aria-hidden="true"></i>
                        <span>{item.views} views</span>
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart" aria-hidden="true"></i>
                        <span>{item.likes} likes</span>
                      </div>
                    </div>
                    <p className="item-description">{item.description}</p>

                    <PersonRow
                      label="Owner"
                      id={item.ownerId}
                      image={item.ownerImage}
                      name={item.ownerName}
                    />
                    <PersonRow
                      label="Creator"
                      id={item.creatorId}
                      image={item.creatorImage}
                      name={item.creatorName}
                    />

                    <div className="item-price-block">
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="Ethereum" />
                        <span>{Number(item.price).toFixed(2)} ETH</span>
                      </div>
                    </div>
                    <Link className="item-details-back" to={backPath}>{backLabel}</Link>
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
