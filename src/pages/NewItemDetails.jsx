import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import ItemCountdown from "../components/home/ItemCountdown";
import { fetchNewItems, isItemId } from "../components/home/newItemsData";
import "../components/home/NewItems.css";

const NewItemDetails = () => {
  const { nftId } = useParams();
  const [result, setResult] = useState({ id: null, status: "loading" });

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();
    // Fail closed before fetching invalid IDs; never substitute another item.
    if (!isItemId(nftId)) {
      setResult({ id: nftId, status: "missing" });
      return () => controller.abort();
    }
    fetchNewItems(controller.signal).then((records) => {
      const record = records.find((item) => String(item.nftId) === nftId);
      if (!controller.signal.aborted) {
        setResult({ id: nftId, status: record ? "ready" : "missing", record });
      }
    }).catch(() => {
      if (!controller.signal.aborted) setResult({ id: nftId, status: "error" });
    });
    return () => controller.abort();
  }, [nftId]);

  const status = result.id === nftId ? result.status : "loading";
  const item = result.record;
  return (
    <div id="wrapper" className="new-item-details">
      <div className="no-bottom no-top" id="content">
        <section aria-label="New item details" className="mt90 sm-mt-0">
          <div className="container">
            {status === "loading" ? (
              <div role="status" aria-label="Loading new item" aria-busy="true">
                <div className="row" aria-hidden="true">
                  <div className="col-md-6 mb-4"><Skeleton width="100%" height="350px" borderRadius="10px" /></div>
                  <div className="col-md-6"><Skeleton width="70%" height="40px" borderRadius="4px" /></div>
                </div>
              </div>
            ) : status === "error" ? (
              <p role="alert">Unable to load this item. Please try again later.</p>
            ) : status === "missing" ? (
              <p role="status">Item not found.</p>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img src={item.nftImage} alt={item.title} className="img-fluid img-rounded mb-sm-30 nft-image" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{item.title}</h2>
                    <p>{item.price} ETH</p>
                    <p>{item.likes} likes</p>
                    <ItemCountdown expiryDate={item.expiryDate} className="new-item-details-countdown" />
                    <h6>Author</h6>
                    <img src={item.authorImage} alt={`Author of ${item.title}`} width="60" height="60" style={{ borderRadius: "50%" }} />
                  </div>
                </div>
              </div>
            )}
            <div className="spacer-20"></div>
            <Link to="/#section-items">Back to New Items</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewItemDetails;
