import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const CollectionDetails = () => {
  const { nftId } = useParams();
  const [result, setResult] = useState({ id: null, status: "loading" });

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();

    // Reject invalid IDs before requesting data; never fall back to another card.
    if (!/^\d+$/.test(nftId)) {
      setResult({ id: nftId, status: "missing" });
      return () => controller.abort();
    }

    const loadCollection = async () => {
      try {
        const response = await fetch(COLLECTIONS_URL, { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load collection");
        const records = await response.json();
        if (!Array.isArray(records)) throw new Error("Invalid collection response");
        const record = records.find((item) => String(item.nftId) === nftId);
        if (!controller.signal.aborted) {
          setResult({ id: nftId, status: record ? "ready" : "missing", record });
        }
      } catch (error) {
        if (!controller.signal.aborted) setResult({ id: nftId, status: "error" });
      }
    };

    loadCollection();
    return () => controller.abort();
  }, [nftId]);

  const status = result.id === nftId ? result.status : "loading";
  const collection = result.record;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="Collection details" className="mt90 sm-mt-0">
          <div className="container">
            {status === "loading" ? (
              <div role="status" aria-label="Loading collection" aria-busy="true">
                <div className="row" aria-hidden="true">
                  <div className="col-md-6 mb-4">
                    <Skeleton width="100%" height="350px" borderRadius="10px" />
                  </div>
                  <div className="col-md-6">
                    <Skeleton width="70%" height="40px" borderRadius="4px" />
                    <div className="spacer-20"></div>
                    <Skeleton width="35%" height="24px" borderRadius="4px" />
                  </div>
                </div>
              </div>
            ) : status === "error" ? (
              <p role="alert">Unable to load this collection. Please try again later.</p>
            ) : status === "missing" ? (
              <p role="status">Collection not found.</p>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img src={collection.nftImage} alt={collection.title}
                    className="img-fluid img-rounded mb-sm-30 nft-image" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{collection.title}</h2>
                    <p>ERC-{collection.code}</p>
                    <h6>Author</h6>
                    <img src={collection.authorImage} alt={`Author of ${collection.title}`}
                      width="60" height="60" style={{ borderRadius: "50%" }} />
                  </div>
                </div>
              </div>
            )}
            <div className="spacer-20"></div>
            <Link to="/">Back to Hot Collections</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CollectionDetails;
