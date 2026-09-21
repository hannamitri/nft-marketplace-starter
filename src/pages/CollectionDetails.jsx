import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URLS, fetchApiList } from "../api/nftApi";
import VerifiedAuthorLink from "../components/UI/VerifiedAuthorLink";

const CollectionDetails = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();

    async function loadCollection() {
      try {
        const collections = await fetchApiList(API_URLS.hotCollections, controller.signal);
        const match = collections.find((entry) => String(entry.id) === id);
        if (!controller.signal.aborted) {
          setCollection(match || null);
          if (!match) setError("Collection not found.");
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError("Unable to load this collection. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadCollection();
    return () => controller.abort();
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="Collection details" className="mt90 sm-mt-0">
          <div className="container">
            {loading && <p role="status">Loading collection details...</p>}
            {!loading && error && <p role="alert">{error} <Link to="/">View Hot Collections</Link></p>}
            {!loading && !error && collection && (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img src={collection.nftImage} className="img-fluid img-rounded mb-sm-30 nft-image" alt={collection.title} />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{collection.title}</h2>
                    <p>ERC-{collection.code}</p>
                    <p>NFT ID: {collection.nftId}</p>
                    <div className="item_author">
                      <h6>Creator</h6>
                      <div className="author_list_pp">
                        <VerifiedAuthorLink
                          authorId={collection.authorId}
                          image={collection.authorImage}
                          alt={`Creator of ${collection.title}`}
                        />
                      </div>
                      <div className="author_list_info">Creator ID: {collection.authorId}</div>
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
