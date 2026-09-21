import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const HOT_COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const CollectionDetails = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();
    setLoading(true);
    setError("");

    async function fetchCollection() {
      try {
        const { data } = await axios.get(HOT_COLLECTIONS_URL, {
          signal: controller.signal,
          timeout: 15000,
        });
        if (!Array.isArray(data)) throw new Error("Unexpected collection response");

        const matchingCollection = data.find((entry) => String(entry.id) === id);
        if (!controller.signal.aborted) {
          setCollection(matchingCollection || null);
          if (!matchingCollection) setError("Collection not found.");
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError("Unable to load this collection. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchCollection();
    return () => controller.abort();
  }, [id]);

  const selectedCollection = collection && String(collection.id) === id
    ? collection
    : null;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="Collection details" className="mt90 sm-mt-0">
          <div className="container">
            {loading && <p role="status">Loading collection details...</p>}
            {!loading && error && <p role="alert">{error} <Link to="/">View Hot Collections</Link></p>}
            {!loading && !error && selectedCollection && (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={selectedCollection.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={selectedCollection.title}
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{selectedCollection.title}</h2>
                    <p>ERC-{selectedCollection.code}</p>
                    <p>NFT ID: {selectedCollection.nftId}</p>
                    <div className="item_author">
                      <h6>Creator</h6>
                      <div className="author_list_pp">
                        <img
                          className="lazy"
                          src={selectedCollection.authorImage}
                          alt={`Creator of ${selectedCollection.title}`}
                        />
                      </div>
                      <div className="author_list_info">Creator ID: {selectedCollection.authorId}</div>
                    </div>
                    <div className="spacer-40"></div>
                    <Link to="/">View Hot Collections</Link>
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

export default CollectionDetails;
